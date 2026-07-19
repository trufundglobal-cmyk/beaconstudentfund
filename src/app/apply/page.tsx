'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  FileText, 
  CheckCircle,
  CaretRight,
  CaretLeft,
  UploadSimple,
  ShieldCheck,
  Bank,
  Spinner
} from '@phosphor-icons/react/dist/ssr';

type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  state: string;
  zipcode: string;
  schoolName: string;
  loanPurpose: string;
  transcriptFile: File | null;
  passportFile: File | null;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  gender: '',
  age: '',
  state: '',
  zipcode: '',
  schoolName: '',
  loanPurpose: '',
  transcriptFile: null,
  passportFile: null,
};

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const LOAN_PURPOSES = [
  "Tuition & Fees",
  "Room & Board",
  "Books & Supplies",
  "Living Expenses",
  "Study Abroad",
  "Other Educational Expenses"
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const totalSteps = 5; // Step 6 is success

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'transcriptFile' | 'passportFile') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      }
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName.trim()) { newErrors.firstName = 'First name is required'; isValid = false; }
      if (!formData.lastName.trim()) { newErrors.lastName = 'Last name is required'; isValid = false; }
      if (!formData.gender) { newErrors.gender = 'Gender is required'; isValid = false; }
      if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 17) { 
        newErrors.age = 'Valid age (17+) is required'; 
        isValid = false; 
      }
    } else if (currentStep === 2) {
      if (!formData.state) { newErrors.state = 'State is required'; isValid = false; }
      if (!formData.zipcode.trim() || !/^\d{5}(-\d{4})?$/.test(formData.zipcode)) { 
        newErrors.zipcode = 'Valid ZIP code is required'; 
        isValid = false; 
      }
    } else if (currentStep === 3) {
      if (!formData.schoolName.trim()) { newErrors.schoolName = 'School name is required'; isValid = false; }
      if (!formData.loanPurpose) { newErrors.loanPurpose = 'Loan purpose is required'; isValid = false; }
    } else if (currentStep === 4) {
      if (!formData.transcriptFile) { newErrors.transcriptFile = 'Transcript is required'; isValid = false; }
      if (!formData.passportFile) { newErrors.passportFile = 'Government ID is required'; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Upload files
      let transcriptPath = null;
      let passportPath = null;
      
      const fileExt1 = formData.transcriptFile?.name.split('.').pop();
      const fileName1 = `transcript-${Date.now()}.${fileExt1}`;
      
      const fileExt2 = formData.passportFile?.name.split('.').pop();
      const fileName2 = `passport-${Date.now()}.${fileExt2}`;

      if (formData.transcriptFile) {
        const { error: uploadError1 } = await supabase.storage
          .from('documents')
          .upload(fileName1, formData.transcriptFile);
        if (uploadError1) throw uploadError1;
        transcriptPath = fileName1;
      }

      if (formData.passportFile) {
        const { error: uploadError2 } = await supabase.storage
          .from('documents')
          .upload(fileName2, formData.passportFile);
        if (uploadError2) throw uploadError2;
        passportPath = fileName2;
      }

      // 2. Insert into database
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      
      const { error: dbError } = await supabase
        .from('applications')
        .insert([{
          full_name: fullName,
          school_name: formData.schoolName,
          // Since loan_amount was dropped from the form, default it to 0 or derive from calculator if it was passed. We'll use 0.
          loan_amount: 0, 
          passport_path: passportPath,
          transcript_path: transcriptPath,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // 3. Go to success step
      setStep(6);
      window.scrollTo(0, 0);

    } catch (err: any) {
      console.error('Error submitting application:', err);
      setSubmitError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI Helpers
  const StepIndicator = () => {
    if (step === 6) return null;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--color-gray-200)] -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-secondary -z-10 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
          
          {[
            { num: 1, icon: User, label: "Personal" },
            { num: 2, icon: MapPin, label: "Location" },
            { num: 3, icon: GraduationCap, label: "Education" },
            { num: 4, icon: FileText, label: "Documents" },
            { num: 5, icon: CheckCircle, label: "Review" }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                step >= s.num 
                  ? 'bg-secondary border-secondary text-white shadow-md' 
                  : 'bg-white border-[var(--color-gray-200)] text-[var(--color-gray-400)]'
              }`}>
                <s.icon weight={step >= s.num ? "fill" : "regular"} size={20} />
              </div>
              <span className={`text-xs mt-2 font-medium hidden sm:block ${
                step >= s.num ? 'text-[var(--color-gray-900)]' : 'text-[var(--color-gray-400)]'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-100)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-gray-900)] tracking-tight">
            Apply for TruFund
          </h1>
          <p className="text-[var(--color-gray-600)] mt-2">
            Complete your application in minutes to see your options.
          </p>
        </div>

        <StepIndicator />

        <div className="bg-white rounded-xl shadow-md border border-[var(--color-gray-200)] overflow-hidden">
          <div className="p-6 sm:p-8">
            
            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-1">Personal Information</h2>
                  <p className="text-sm text-[var(--color-gray-600)]">Tell us a bit about yourself.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.firstName ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.lastName ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">Gender</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-white ${errors.gender ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">Age</label>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="17"
                      max="100"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.age ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                      placeholder="e.g. 20"
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION INFO */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-1">Location Details</h2>
                  <p className="text-sm text-[var(--color-gray-600)]">Where do you currently reside?</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">State</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-white ${errors.state ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                    >
                      <option value="">Select State</option>
                      {US_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.zipcode ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                      placeholder="e.g. 90210"
                    />
                    {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: EDUCATION & LOAN DETAILS */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-1">Education & Funding</h2>
                  <p className="text-sm text-[var(--color-gray-600)]">Tell us about your school and loan needs.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">School Name</label>
                  <input 
                    type="text" 
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.schoolName ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                    placeholder="e.g. University of California, Los Angeles"
                  />
                  {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-1">Loan Purpose</label>
                  <select 
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-white ${errors.loanPurpose ? 'border-red-500' : 'border-[var(--color-gray-200)]'}`}
                  >
                    <option value="">Select Purpose</option>
                    {LOAN_PURPOSES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
                </div>
                
                <div className="bg-[var(--color-light-teal)] p-4 rounded-lg border border-secondary/20 flex gap-3">
                  <Bank size={24} className="text-secondary flex-shrink-0" weight="duotone" />
                  <p className="text-sm text-[var(--color-gray-600)]">
                    TruFund funds are sent directly to your verified bank account, giving you the flexibility to pay for approved educational expenses as needed.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENTS */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-1">Required Documents</h2>
                  <p className="text-sm text-[var(--color-gray-600)]">Please upload the following to verify your identity and enrollment.</p>
                </div>
                
                {/* Transcript Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-2">Latest School Transcript</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${formData.transcriptFile ? 'border-secondary bg-[var(--color-light-teal)]' : errors.transcriptFile ? 'border-red-500 bg-red-50' : 'border-[var(--color-gray-300)] hover:border-primary bg-[var(--color-gray-50)]'}`}>
                    <input 
                      type="file" 
                      id="transcriptUpload"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'transcriptFile')}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="transcriptUpload" className="cursor-pointer flex flex-col items-center justify-center">
                      {formData.transcriptFile ? (
                        <>
                          <CheckCircle size={32} weight="fill" className="text-secondary mb-2" />
                          <span className="text-sm font-semibold text-[var(--color-gray-900)]">{formData.transcriptFile.name}</span>
                          <span className="text-xs text-secondary mt-1 hover:underline">Change file</span>
                        </>
                      ) : (
                        <>
                          <UploadSimple size={32} className="text-[var(--color-gray-400)] mb-2" />
                          <span className="text-sm font-medium text-primary hover:text-primary-light">Click to upload transcript</span>
                          <span className="text-xs text-[var(--color-gray-500)] mt-1">PDF, JPG, or PNG (Max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.transcriptFile && <p className="text-red-500 text-xs mt-1">{errors.transcriptFile}</p>}
                </div>

                {/* Passport/ID Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-2">Government Issued ID (Passport / Driver's License)</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${formData.passportFile ? 'border-secondary bg-[var(--color-light-teal)]' : errors.passportFile ? 'border-red-500 bg-red-50' : 'border-[var(--color-gray-300)] hover:border-primary bg-[var(--color-gray-50)]'}`}>
                    <input 
                      type="file" 
                      id="passportUpload"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'passportFile')}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="passportUpload" className="cursor-pointer flex flex-col items-center justify-center">
                      {formData.passportFile ? (
                        <>
                          <CheckCircle size={32} weight="fill" className="text-secondary mb-2" />
                          <span className="text-sm font-semibold text-[var(--color-gray-900)]">{formData.passportFile.name}</span>
                          <span className="text-xs text-secondary mt-1 hover:underline">Change file</span>
                        </>
                      ) : (
                        <>
                          <UploadSimple size={32} className="text-[var(--color-gray-400)] mb-2" />
                          <span className="text-sm font-medium text-primary hover:text-primary-light">Click to upload ID</span>
                          <span className="text-xs text-[var(--color-gray-500)] mt-1">PDF, JPG, or PNG (Max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.passportFile && <p className="text-red-500 text-xs mt-1">{errors.passportFile}</p>}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[var(--color-gray-500)]">
                  <ShieldCheck size={16} /> All documents are securely encrypted.
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-1">Review Your Information</h2>
                  <p className="text-sm text-[var(--color-gray-600)]">Please verify that everything is correct before submitting.</p>
                </div>
                
                <div className="bg-[var(--color-gray-50)] rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--color-gray-200)] flex justify-between items-center bg-white">
                    <h3 className="font-semibold text-[var(--color-gray-900)] text-sm uppercase tracking-wider">Personal</h3>
                    <button onClick={() => setStep(1)} className="text-xs text-primary font-medium hover:underline">Edit</button>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">Name</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">Gender</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.gender}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">Age</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.age}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-gray-50)] rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--color-gray-200)] flex justify-between items-center bg-white">
                    <h3 className="font-semibold text-[var(--color-gray-900)] text-sm uppercase tracking-wider">Location</h3>
                    <button onClick={() => setStep(2)} className="text-xs text-primary font-medium hover:underline">Edit</button>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">State</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.state}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">ZIP Code</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.zipcode}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-gray-50)] rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--color-gray-200)] flex justify-between items-center bg-white">
                    <h3 className="font-semibold text-[var(--color-gray-900)] text-sm uppercase tracking-wider">Education</h3>
                    <button onClick={() => setStep(3)} className="text-xs text-primary font-medium hover:underline">Edit</button>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">School Name</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.schoolName}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--color-gray-500)] text-xs mb-1">Loan Purpose</span>
                      <span className="font-medium text-[var(--color-gray-900)]">{formData.loanPurpose}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-gray-50)] rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--color-gray-200)] flex justify-between items-center bg-white">
                    <h3 className="font-semibold text-[var(--color-gray-900)] text-sm uppercase tracking-wider">Documents</h3>
                    <button onClick={() => setStep(4)} className="text-xs text-primary font-medium hover:underline">Edit</button>
                  </div>
                  <div className="p-4 flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="text-success" />
                      <span className="text-[var(--color-gray-600)]">Transcript:</span>
                      <span className="font-medium text-[var(--color-gray-900)] truncate max-w-[200px]">{formData.transcriptFile?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="text-success" />
                      <span className="text-[var(--color-gray-600)]">ID/Passport:</span>
                      <span className="font-medium text-[var(--color-gray-900)] truncate max-w-[200px]">{formData.passportFile?.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-accent/20">
                  <p className="text-xs text-[var(--color-gray-700)]">
                    By clicking "Submit Application", you authorize TruFund to perform a soft credit inquiry to determine your eligibility and rates. This will not affect your credit score.
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">Submission Failed: {submitError}</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: SUCCESS */}
            {step === 6 && (
              <div className="py-8 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-[var(--color-light-teal)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} weight="fill" className="text-secondary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-gray-900)] mb-4">Application Submitted!</h2>
                <p className="text-[var(--color-gray-600)] max-w-md mx-auto mb-8">
                  Thank you, {formData.firstName}. We've received your application and documents. Our team is reviewing them now. 
                  You will receive an email within 2 minutes with your decision and next steps.
                </p>
                <div className="p-6 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] mb-8 max-w-sm mx-auto">
                  <p className="text-sm text-[var(--color-gray-500)] mb-1 uppercase tracking-wider font-semibold">Application Reference</p>
                  <p className="text-xl font-mono text-primary font-bold">TF-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <Link 
                  href="/"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            )}

            {/* Navigation Buttons (Bottom) */}
            {step < 6 && (
              <div className="mt-10 pt-6 border-t border-[var(--color-gray-200)] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-4 py-2 text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)] font-medium transition-colors"
                  >
                    <CaretLeft weight="bold" /> Back
                  </button>
                ) : (
                  <div></div> // Spacer
                )}
                
                {step < 5 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Continue <CaretRight weight="bold" />
                  </button>
                ) : (
                  <button
                    onClick={submitApplication}
                    disabled={isSubmitting}
                    className="flex items-center justify-center min-w-[200px] gap-2 px-8 py-3 bg-secondary hover:bg-secondary-hover text-white font-semibold rounded-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

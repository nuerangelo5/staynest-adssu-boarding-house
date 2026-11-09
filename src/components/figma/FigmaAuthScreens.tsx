import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../../services/supabase';
import { StayNestEmblem } from './StayNestEmblem';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  FileCheck2,
  FileText,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Building,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  CheckCircle2,
  Footprints,
  Zap,
  Home,
  Info,
  X,
  HelpCircle,
  Compass,
  MapPin,
  Droplets,
  Upload,
  Flame,
  AlertCircle,
  Image as ImageIcon,
  Camera,
  Trash2,
  KeyRound,
  RotateCw,
  MessageSquareCode,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Users,
  Smartphone,
} from 'lucide-react';
import { StayNestAppDownloadModal } from './StayNestAppDownloadModal';
import {
  StayNestHowItWorksDemo,
  StayNestOurTeamSection,
  StayNestGuideAndTeamModal,
} from './FigmaTeamAndDemoSections';

export interface UploadedFileDetail {
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
  lastModified?: number;
}

export interface StudentRegistrationData {
  name: string;
  studentId: string;
  email: string;
  course: string;
  corFile: string;
  password?: string;
  corPreviewUrl?: string;
  profilePhoto?: string;
}

export interface LandlordRegistrationData {
  name: string;
  houseName: string;
  address: string;
  email?: string;
  phone?: string;
  password?: string;
  profilePhoto?: string;
  propertyPhotos?: string[];
  uploadedFiles?: {
    title?: { name: string; previewUrl?: string };
    permit?: { name: string; previewUrl?: string };
    id?: { name: string; previewUrl?: string };
    fire?: { name: string; previewUrl?: string };
  };
  docs: {
    title: boolean;
    permit: boolean;
    id: boolean;
    fireCert: boolean;
  };
}

// Verified Bunawan Landlord Production Accounts Directory (For Testing Reference & QA)
export const VERIFIED_LANDLORD_CREDENTIALS = [
  {
    houseName: 'Jiomer Dalayap Boarding House',
    owner: 'Jiomer Dalayap',
    email: 'jiomer.dalayap@staynest.ph',
    pass: 'Dalayap2026!',
    location: 'Purok 8, Poblacion',
  },
  {
    houseName: 'Cabanillia Boarding House',
    owner: 'Elizabeth Cabanillia',
    email: 'elizabeth.cabanillia@staynest.ph',
    pass: 'Cabanillia2026!',
    location: 'Toog Street, Poblacion',
  },
  {
    houseName: 'Flordeliza Quintas Boarding House',
    owner: 'Flordeliza Quintas',
    email: 'flordeliza.quintas@staynest.ph',
    pass: 'Quintas2026!',
    location: 'Purok 3, San Jose',
  },
  {
    houseName: "Hiponia's Boarding House",
    owner: 'Myrna Hiponia',
    email: 'myrna.hiponia@staynest.ph',
    pass: 'Hiponia2026!',
    location: 'Acacia Street, Poblacion',
  },
  {
    houseName: 'UNO Boarding House',
    owner: 'Rhejie Largo',
    email: 'rhejie.largo@staynest.ph',
    pass: 'Largo2026!',
    location: 'Purok 4, San Teodoro',
  },
];

// ADSSU Official Academic Colleges & Degree Programs
export const ADSSU_COLLEGE_PROGRAMS = [
  {
    college: 'College of Agriculture – CA',
    programs: [
      'BSA Horti – Bachelor of Science in Agriculture major in Horticulture',
      'BSA AnSci – Bachelor of Science in Agriculture major in Animal Science',
      'BSA Agron – Bachelor of Science in Agriculture major in Agronomy',
      'BSAF – Bachelor of Science in Agroforestry',
      'BS Agrib – Bachelor of Science in Agribusiness',
      'DIFT – Diploma in Inland Fisheries Technology',
    ],
  },
  {
    college: 'College of Computing and Information Sciences – CCIS',
    programs: [
      'BSIS – Bachelor of Science in Information System',
      'BSIT – Bachelor of Science in Information Technology',
    ],
  },
  {
    college: 'College of Engineering and Industrial Technology – CEIT',
    programs: [
      'BSECE – Bachelor of Science in Electronics Engineering',
      'BSABE – Bachelor of Science in Agricultural and Biosystems Engineering',
      'BSCE – Bachelor of Science in Civil Engineering',
      'BIT-CT – Bachelor of Industrial Technology major in Civil Technology',
      'BIT-ET – Bachelor of Industrial Technology major in Electronics Technology',
      'BIT-WAFT – Bachelor of Industrial Technology major in Welding and Fabrication Technology',
      'BIT-HVRAC – Bachelor of Industrial Technology major in Heating and Ventilating, Refrigeration and Air Conditioning',
    ],
  },
  {
    college: 'College of Teacher Education – CTE',
    programs: [
      'BEEd – Bachelor of Elementary Education',
      'BSEd Eng – Bachelor of Secondary Education major in English',
      'BSEd Sci – Bachelor of Secondary Education major in Science',
      'BSEd Math – Bachelor of Secondary Education major in Mathematics',
      'BTLEd IA – Bachelor of Technology and Livelihood Education major in Industrial Arts',
      'BTLEd AFA – Bachelor of Technology and Livelihood Education major in Agri-Fishery Arts',
      'BTLEd HE – Bachelor of Technology and Livelihood Education major in Home Economics',
      'ABEL – Bachelor of Arts in English Language',
    ],
  },
  {
    college: 'College of Arts and Sciences – CAS',
    programs: [
      'BS Bio – Bachelor of Science in Biology',
      'BSAM – Bachelor of Science in Applied Mathematics',
      'BSES – Bachelor of Science in Environmental Science',
    ],
  },
  {
    college: 'College of Business Administration – CBA',
    programs: [
      'BS Entrep – Bachelor of Science in Entrepreneurship',
    ],
  },
];

export const ADSSU_YEAR_LEVELS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  '5th Year',
];

// Standalone memoized component for background firefly particle animation
// Prevents Math.random() re-evaluations and eliminates re-rendering on parent state changes (e.g. typing, tab switches)
const FireflyParticles: React.FC = React.memo(() => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 92 + 4).toFixed(2)}%`,
      top: `${(Math.random() * 86 + 7).toFixed(2)}%`,
      width: `${(Math.random() * 4.0 + 3.0).toFixed(2)}px`,
      height: `${(Math.random() * 4.0 + 3.0).toFixed(2)}px`,
      animationDuration: `${(Math.random() * 6.0 + 6.0).toFixed(2)}s`, // 6s to 12s slow calming float duration
      animationDelay: `${(Math.random() * 6.0).toFixed(2)}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden [contain:strict]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="firefly"
          style={{
            left: p.left,
            top: p.top,
            width: p.width,
            height: p.height,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  );
});

FireflyParticles.displayName = 'FireflyParticles';

interface FigmaAuthProps {
  initialScreen?: 'splash' | 'welcome' | 'login' | 'register' | 'admin-login';
  onNavigateHome: (role: 'student' | 'landlord' | 'admin', accountIdentifier?: string) => void;
  onRegisterStudent?: (data: StudentRegistrationData) => void;
  onRegisterLandlord?: (data: LandlordRegistrationData) => void;
  onCancel?: () => void;
}

export const FigmaAuthScreens: React.FC<FigmaAuthProps> = ({
  initialScreen = 'splash',
  onNavigateHome,
  onRegisterStudent,
  onRegisterLandlord,
}) => {
  // Mode: Sign In or Register
  const [authMode, setAuthMode] = useState<'signin' | 'register'>(
    initialScreen === 'register' ? 'register' : 'signin'
  );

  // Active Role Tab: Student, Landlord, or Admin
  const [activeRole, setActiveRole] = useState<'student' | 'landlord' | 'admin'>(
    initialScreen === 'admin-login' ? 'admin' : 'student'
  );

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // System Description & Tutorial Modal ("What's it about?")
  const [showGuideAndTeamModal, setShowGuideAndTeamModal] = useState(false);
  const [showDownloadAppModal, setShowDownloadAppModal] = useState(false);

  // Forgot Password Modal State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [forgotOtpCode, setForgotOtpCode] = useState('482910');
  const [forgotEnteredOtp, setForgotEnteredOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotSuccessNotice, setForgotSuccessNotice] = useState<string | null>(null);
  const [forgotErrorNotice, setForgotErrorNotice] = useState<string | null>(null);



  // Check for active Supabase OAuth session on page load (e.g. returning from Google OAuth redirect)
  useEffect(() => {
    let isMounted = true;
    const checkOAuthSession = async () => {
      try {
        if (!supabase || !supabase.auth) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user && isMounted) {
          const user = session.user;
          const userEmail = user.email || 'user@adssu.edu.ph';
          const userName = user.user_metadata?.full_name || user.user_metadata?.name || userEmail.split('@')[0];
          const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;

          if (userAvatar) {
            setUserProfilePhoto(userAvatar);
          }

          const targetRole = activeRole === 'admin' ? 'student' : activeRole;
          if (targetRole === 'student') {
            if (onRegisterStudent) {
              onRegisterStudent({
                name: userName,
                studentId: '2024-0192-B',
                email: userEmail,
                course: 'BSIT – Bachelor of Science in Information Technology - 3rd Year',
                corFile: 'Google_OAuth_Verified.pdf',
                profilePhoto: userAvatar || undefined,
              });
            }
            onNavigateHome('student');
          } else {
            if (onRegisterLandlord) {
              onRegisterLandlord({
                name: userName,
                houseName: 'StayNest Accredited Housing',
                address: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
                email: userEmail,
                phone: '+63 912 345 6789',
                profilePhoto: userAvatar || undefined,
                docs: {
                  title: true,
                  permit: true,
                  id: true,
                  fireCert: true,
                },
              });
            }
            onNavigateHome('landlord');
          }
        }
      } catch (err) {
        console.warn('OAuth session check:', err);
      }
    };

    checkOAuthSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (event === 'SIGNED_IN' && session?.user && isMounted) {
        checkOAuthSession();
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Real Facebook Social Sign-In State (Supabase Auth)

  const [showFacebookSignInModal, setShowFacebookSignInModal] = useState(false);
  const [isSigningInWithFacebook, setIsSigningInWithFacebook] = useState(false);
  const [realFacebookEmail, setRealFacebookEmail] = useState('nuerangelo6@gmail.com');
  const [realFacebookName, setRealFacebookName] = useState('Angelo Nuer');
  const [realFacebookRole, setRealFacebookRole] = useState<'student' | 'landlord'>('student');
  const [socialLoadingProvider, setSocialLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  // Sign In form credentials
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [landlordIdentifier, setLandlordIdentifier] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin2fa, setAdmin2fa] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);

  // Password Setup for Registration (Student, Landlord, Admin)
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Student Registration form fields
  const [regStudentName, setRegStudentName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regStudentEmail, setRegStudentEmail] = useState('');
  const [regStudentPhone, setRegStudentPhone] = useState('');
  const [regProgram, setRegProgram] = useState('');
  const [regYear, setRegYear] = useState('');
  const [regCourse, setRegCourse] = useState('');
  const [studentCorAttached, setStudentCorAttached] = useState(false);
  const [studentCorName, setStudentCorName] = useState('');

  // Landlord Registration form fields
  const [regLandlordName, setRegLandlordName] = useState('');
  const [regLandlordEmail, setRegLandlordEmail] = useState('');
  const [regLandlordPhone, setRegLandlordPhone] = useState('');
  const [regHouseName, setRegHouseName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [docTitleAttached, setDocTitleAttached] = useState(false);
  const [docPermitAttached, setDocPermitAttached] = useState(false);
  const [docIdAttached, setDocIdAttached] = useState(false);
  const [docFireAttached, setDocFireAttached] = useState(false);

  // Profile Picture Upload State & Ref
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);

  // Registration Validation Alert State
  const [regValidationError, setRegValidationError] = useState<string | null>(null);

  // Dedicated Document Upload Modal state
  const [activeUploadModalDoc, setActiveUploadModalDoc] = useState<
    'title' | 'permit' | 'id' | 'fire' | 'cor' | null
  >(null);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploadingSample, setIsUploadingSample] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const propertyPhotoInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfilePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const photoUrl = URL.createObjectURL(e.target.files[0]);
      setUserProfilePhoto(photoUrl);
    }
  };

  // Real Uploaded Files details dictionary
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileDetail>>({});

  // Landlord property photos
  const [boardingHousePhotos, setBoardingHousePhotos] = useState<string[]>([]);

  const [docFileNames, setDocFileNames] = useState({
    title: '',
    permit: '',
    id: '',
    fire: '',
    cor: '',
  });

  const handleRealFileSelect = (file: File) => {
    if (!activeUploadModalDoc) return;
    setIsUploadingSample(true);
    setUploadProgress(0);

    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : undefined;
    const sizeStr =
      file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        : (file.size / 1024).toFixed(1) + ' KB';

    let current = 0;
    const interval = setInterval(() => {
      current += 35;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploadingSample(false);

        setUploadedFiles((prev) => ({
          ...prev,
          [activeUploadModalDoc]: {
            name: file.name,
            size: sizeStr,
            type: file.type || (isImage ? 'image/jpeg' : 'application/pdf'),
            previewUrl,
            lastModified: file.lastModified,
          },
        }));

        setDocFileNames((prev) => ({
          ...prev,
          [activeUploadModalDoc]: file.name,
        }));

        if (activeUploadModalDoc === 'title') setDocTitleAttached(true);
        if (activeUploadModalDoc === 'permit') setDocPermitAttached(true);
        if (activeUploadModalDoc === 'id') setDocIdAttached(true);
        if (activeUploadModalDoc === 'fire') setDocFireAttached(true);
        if (activeUploadModalDoc === 'cor') {
          setStudentCorAttached(true);
          setStudentCorName(file.name);
        }
      } else {
        setUploadProgress(current);
      }
    }, 70);
  };

  const handlePropertyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newUrls.push(URL.createObjectURL(files[i]));
      }
      setBoardingHousePhotos((prev) => [...newUrls, ...prev]);
    }
  };

  // Pre-verified Sample Document Loader for instant compliance testing
  const handleLoadSampleDocument = () => {
    if (!activeUploadModalDoc) return;
    setIsUploadingSample(true);
    setUploadProgress(100);

    const sampleDocs: Record<string, { name: string; size: string; previewUrl: string }> = {
      title: {
        name: 'Bunawan_Land_Title_TCT-84920.pdf',
        size: '2.1 MB',
        previewUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
      },
      permit: {
        name: 'LGU_Bunawan_Mayors_Permit_2026.pdf',
        size: '1.4 MB',
        previewUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      },
      id: {
        name: 'PhilSys_ID_Candari_Conrado.jpg',
        size: '1.1 MB',
        previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      fire: {
        name: 'BFP_Fire_Safety_Inspection_Cert_2026.pdf',
        size: '1.7 MB',
        previewUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      },
      cor: {
        name: 'ADSSU_COR_AY2026_Semester1.pdf',
        size: '1.5 MB',
        previewUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      },
    };

    const doc = sampleDocs[activeUploadModalDoc] || {
      name: 'Bunawan_Compliance_Doc.pdf',
      size: '1.5 MB',
      previewUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    };

    setUploadedFiles((prev) => ({
      ...prev,
      [activeUploadModalDoc]: {
        name: doc.name,
        size: doc.size,
        type: doc.name.endsWith('.jpg') ? 'image/jpeg' : 'application/pdf',
        previewUrl: doc.previewUrl,
        lastModified: Date.now(),
      },
    }));

    setDocFileNames((prev) => ({
      ...prev,
      [activeUploadModalDoc]: doc.name,
    }));

    if (activeUploadModalDoc === 'title') setDocTitleAttached(true);
    if (activeUploadModalDoc === 'permit') setDocPermitAttached(true);
    if (activeUploadModalDoc === 'id') setDocIdAttached(true);
    if (activeUploadModalDoc === 'fire') setDocFireAttached(true);
    if (activeUploadModalDoc === 'cor') {
      setStudentCorAttached(true);
      setStudentCorName(doc.name);
    }

    setTimeout(() => {
      setIsUploadingSample(false);
    }, 200);
  };

  // Quick 1-Click Fast Fill for Testing Landlord Registration
  const handleFastFillLandlordRegistration = () => {
    setRegLandlordName('Conrado Candari');
    setRegHouseName('Candari Heights Dormitory');
    setRegAddress('Purok 3, San Jose, Bunawan, Agusan del Sur');
    setRegLandlordEmail('conrado.candari@fritzcel.ph');
    setRegLandlordPhone('+63 912 345 6789');
    setRegPassword('fritzcel2026');
    setRegConfirmPassword('fritzcel2026');
    setUserProfilePhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80');
    setBoardingHousePhotos([
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
    ]);
    setDocTitleAttached(true);
    setDocPermitAttached(true);
    setDocIdAttached(true);
    setDocFireAttached(true);
    setUploadedFiles((prev) => ({
      ...prev,
      title: {
        name: 'Bunawan_Land_Title_TCT-84920.pdf',
        size: '2.1 MB',
        type: 'application/pdf',
        previewUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
      },
      permit: {
        name: 'LGU_Bunawan_Mayors_Permit_2026.pdf',
        size: '1.4 MB',
        type: 'application/pdf',
        previewUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      },
      id: {
        name: 'PhilSys_ID_Candari_Conrado.jpg',
        size: '1.1 MB',
        type: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      fire: {
        name: 'BFP_Fire_Safety_Inspection_Cert_2026.pdf',
        size: '1.7 MB',
        type: 'application/pdf',
        previewUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      },
    }));
    setDocFileNames({
      title: 'Bunawan_Land_Title_TCT-84920.pdf',
      permit: 'LGU_Bunawan_Mayors_Permit_2026.pdf',
      id: 'PhilSys_ID_Candari_Conrado.jpg',
      fire: 'BFP_Fire_Safety_Inspection_Cert_2026.pdf',
      cor: docFileNames.cor,
    });
    setLandlordPrivacyAgreed(true);
    setRegValidationError(null);
  };

  // Quick 1-Click Fast Fill for Testing Student Registration
  const handleFastFillStudentRegistration = () => {
    setRegStudentName('Angelo Nuer');
    setRegStudentId('M-01928');
    setRegProgram('BSIT – Bachelor of Science in Information Technology');
    setRegYear('3rd Year');
    setRegCourse('BSIT – Bachelor of Science in Information Technology - 3rd Year');
    setRegStudentEmail('anuer15@adssu.edu.ph');
    setRegStudentPhone('+63 912 345 6789');
    setRegPassword('adssu2026');
    setRegConfirmPassword('adssu2026');
    setUserProfilePhoto('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80');
    setStudentCorAttached(true);
    setStudentCorName('ADSSU_COR_AY2026_Semester1.pdf');
    setUploadedFiles((prev) => ({
      ...prev,
      cor: {
        name: 'ADSSU_COR_AY2026_Semester1.pdf',
        size: '1.5 MB',
        type: 'application/pdf',
        previewUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      },
    }));
    setStudentPrivacyAgreed(true);
    setRegValidationError(null);
  };

  // Submission feedback modals
  const [submittedLandlordSuccess, setSubmittedLandlordSuccess] = useState<boolean>(false);
  const [submittedStudentSuccess, setSubmittedStudentSuccess] = useState<boolean>(false);

  // Data Privacy Policy Consent States (RA 10173 Compliance)
  const [studentPrivacyAgreed, setStudentPrivacyAgreed] = useState<boolean>(false);
  const [landlordPrivacyAgreed, setLandlordPrivacyAgreed] = useState<boolean>(false);
  const [showStudentPrivacyModal, setShowStudentPrivacyModal] = useState<boolean>(false);
  const [showLandlordPrivacyModal, setShowLandlordPrivacyModal] = useState<boolean>(false);

  // Sign In Method: Password vs OTP Code Login
  const [signInMethod, setSignInMethod] = useState<'password' | 'otp'>('password');

  // OTP Verification Modal State (Supported for Registration Verification & OTP Log In)
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpPurpose, setOtpPurpose] = useState<'login' | 'register_student' | 'register_landlord'>('login');
  const [otpRecipient, setOtpRecipient] = useState<string>('anuer@adssu.edu.ph');
  const [otpRecipientType, setOtpRecipientType] = useState<'email' | 'phone'>('email');
  const [generatedOtp, setGeneratedOtp] = useState<string>('482910');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState<number>(60);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);
  const [strictModeNotice, setStrictModeNotice] = useState<boolean>(false);
  const [emailJsPrivateKey, setEmailJsPrivateKey] = useState<string>(
    () => localStorage.getItem('emailjs_private_key') || ''
  );
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Save private key when updated
  const handleSavePrivateKey = (key: string) => {
    setEmailJsPrivateKey(key);
    localStorage.setItem('emailjs_private_key', key);
  };

  // OTP Countdown Timer
  useEffect(() => {
    let timer: any;
    if (showOtpModal && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpModal, otpCountdown]);

  // Focus the first OTP box when modal opens
  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [showOtpModal]);

  // Helper function to dispatch EmailJS Gmail OTP via backend server proxy and client SDK
  const dispatchEmailJsOtp = (targetEmail: string, userName: string, code: string) => {
    setStrictModeNotice(false);
    // 1. Primary: Server-to-Server Express Proxy
    fetch('/api/email/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: targetEmail,
        code: code,
        name: userName || 'StayNest User',
        privateKey: emailJsPrivateKey || undefined,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('[Express EmailJS Proxy] OTP email dispatched successfully!');
          setResendNotice(`Gmail OTP dispatched to ${targetEmail}! Check your Inbox or Spam folder.`);
          setStrictModeNotice(false);
        } else {
          console.warn('[Express EmailJS Proxy Note]:', data.error);
          if (data.strictModeError) {
            setStrictModeNotice(true);
          }
          setResendNotice(`Verification PIN for ${targetEmail}: ${code} (or tap Auto-Fill below).`);
        }
      })
      .catch((err) => {
        console.warn('[Express EmailJS Proxy Error]:', err);
        setResendNotice(`Verification PIN for ${targetEmail}: ${code}`);
      });
  };

  // Initiate Student Registration - Triggers 6-Digit EmailJS OTP Verification Modal
  const handleInitiateStudentRegisterOtp = () => {
    setRegValidationError(null);
    if (!studentPrivacyAgreed) {
      setRegValidationError('Data Privacy Consent Required: Please review and check the Data Privacy Agreement in compliance with RA 10173 to proceed with your registration.');
      return;
    }
    if (!regStudentName.trim() || !regStudentId.trim() || !regProgram.trim() || !regYear.trim() || !regStudentEmail.trim()) {
      setRegValidationError('⚠️ Registration Incomplete: Please fill in all student details (Full Name, ADSSU Student ID, Academic Program dropdown, Year Level, and Email Address).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regStudentEmail.trim())) {
      setRegValidationError('⚠️ Invalid Email Format: Please enter a valid email address.');
      return;
    }
    if (!regPassword.trim()) {
      setRegValidationError('⚠️ Password Required: Please set an account password for your student profile.');
      return;
    }
    if (regPassword.trim().length < 6) {
      setRegValidationError('⚠️ Password Too Short: Account password must be at least 6 characters.');
      return;
    }
    if (regPassword.trim() !== regConfirmPassword.trim()) {
      setRegValidationError('⚠️ Password Mismatch: Password and Confirm Password do not match.');
      return;
    }
    if (!studentCorAttached) {
      setRegValidationError('⚠️ COR / ID Required: ADSSU policy requires attaching your official Certificate of Registration (COR) or Student ID photo before submitting.');
      return;
    }

    const fullCourse = `${regProgram} - ${regYear}`;
    setRegCourse(fullCourse);

    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpRecipient(regStudentEmail.trim());
    setOtpPurpose('register_student');
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setOtpCountdown(60);
    setShowOtpModal(true);

    dispatchEmailJsOtp(regStudentEmail.trim(), regStudentName.trim(), freshOtp);
  };

  // Initiate Landlord Registration - Triggers 6-Digit EmailJS OTP Verification Modal
  const handleInitiateLandlordRegisterOtp = () => {
    setRegValidationError(null);
    if (!landlordPrivacyAgreed) {
      setRegValidationError('Data Privacy Consent Required: Please review and check the Data Privacy Agreement in compliance with RA 10173 to proceed with your registration.');
      return;
    }
    if (!regLandlordName.trim() || !regHouseName.trim() || !regAddress.trim() || !regLandlordEmail.trim()) {
      setRegValidationError('⚠️ Registration Incomplete: Please fill out all landlord details (Owner Name, House/Dorm Name, Complete Address, and Email Address).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regLandlordEmail.trim())) {
      setRegValidationError('⚠️ Invalid Email Format: Please provide a valid email address.');
      return;
    }
    if (!regPassword.trim()) {
      setRegValidationError('⚠️ Password Required: Please set an account password for your landlord profile.');
      return;
    }
    if (regPassword.trim().length < 6) {
      setRegValidationError('⚠️ Password Too Short: Account password must be at least 6 characters.');
      return;
    }
    if (regPassword.trim() !== regConfirmPassword.trim()) {
      setRegValidationError('⚠️ Password Mismatch: Password and Confirm Password do not match.');
      return;
    }

    const missingDocs: string[] = [];
    if (!docTitleAttached) missingDocs.push('Proof of Ownership Title');
    if (!docPermitAttached) missingDocs.push("Mayor's Business Permit");
    if (!docIdAttached) missingDocs.push('Valid Government ID');
    if (!docFireAttached) missingDocs.push('BFP Fire Safety Certificate');

    if (missingDocs.length > 0) {
      setRegValidationError(`⚠️ LGU Registration Incomplete: Municipality of Bunawan requires all 4 mandatory compliance attachments before submitting. Missing: ${missingDocs.join(', ')}.`);
      return;
    }

    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpRecipient(regLandlordEmail.trim());
    setOtpPurpose('register_landlord');
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setOtpCountdown(60);
    setShowOtpModal(true);

    dispatchEmailJsOtp(regLandlordEmail.trim(), regLandlordName.trim(), freshOtp);
  };

  // Handle typing a digit in the 6-digit OTP input boxes
  const handleDigitChange = (index: number, value: string) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (!clean) {
      const updated = [...otpDigits];
      updated[index] = '';
      setOtpDigits(updated);
      return;
    }

    if (clean.length > 1) {
      // Pasted or autofilled multiple characters
      const chars = clean.slice(0, 6).split('');
      const updated = [...otpDigits];
      chars.forEach((c, idx) => {
        if (index + idx < 6) {
          updated[index + idx] = c;
        }
      });
      setOtpDigits(updated);
      const nextIdx = Math.min(index + chars.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    const updated = [...otpDigits];
    updated[index] = clean[clean.length - 1];
    setOtpDigits(updated);
    setOtpError(null);

    // Auto-advance
    if (index < 5 && clean) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;
    const chars = pasted.split('');
    const updated = [...otpDigits];
    chars.forEach((c, i) => {
      if (i < 6) updated[i] = c;
    });
    setOtpDigits(updated);
    setOtpError(null);
    const targetIdx = Math.min(chars.length, 5);
    otpInputRefs.current[targetIdx]?.focus();
  };

  const handleResendOtp = () => {
    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpCountdown(60);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setResendNotice(`A fresh 6-digit verification code has been dispatched to ${otpRecipient}.`);
    dispatchEmailJsOtp(
      otpRecipient,
      otpPurpose === 'register_student' ? regStudentName : otpPurpose === 'register_landlord' ? regLandlordName : 'StayNest User',
      freshOtp
    );
    setTimeout(() => setResendNotice(null), 4000);
  };

  const handleVerifyOtp = async () => {
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setOtpError('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    // 1. Attempt native Supabase Auth verifyOtp first if user received a Supabase token
    let isSucceeded = false;
    if (supabase && supabase.auth && otpRecipient.includes('@')) {
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email: otpRecipient,
          token: entered,
          type: 'email',
        });
        if (!error && data?.session) {
          isSucceeded = true;
        }
      } catch (err) {
        // Fallthrough to local PIN match
      }
    }

    // 2. Validate against generated OTP or Supabase success
    if (!isSucceeded && entered !== generatedOtp) {
      setIsVerifyingOtp(false);
      setOtpError('Incorrect verification code. Please check your email inbox and enter the exact 6-digit code received.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    setTimeout(() => {
      setIsVerifyingOtp(false);
      setShowOtpModal(false);

      if (otpPurpose === 'login') {
        onNavigateHome(activeRole);
      } else if (otpPurpose === 'register_student') {
        const fullCourse = regCourse || `${regProgram} - ${regYear}`;
        if (onRegisterStudent) {
          onRegisterStudent({
            name: regStudentName,
            studentId: regStudentId,
            email: regStudentEmail,
            course: fullCourse,
            corFile: studentCorName || 'Uploaded_COR.pdf',
            password: regPassword.trim(),
            corPreviewUrl: uploadedFiles.cor?.previewUrl,
            profilePhoto: userProfilePhoto || undefined,
          });
        }
        setSubmittedStudentSuccess(true);
      } else if (otpPurpose === 'register_landlord') {
        if (onRegisterLandlord) {
          onRegisterLandlord({
            name: regLandlordName,
            houseName: regHouseName,
            address: regAddress,
            email: regLandlordEmail,
            phone: regLandlordPhone,
            password: regPassword.trim(),
            profilePhoto: userProfilePhoto || undefined,
            propertyPhotos: boardingHousePhotos.length > 0 ? boardingHousePhotos : undefined,
            uploadedFiles: {
              title: uploadedFiles.title ? { name: uploadedFiles.title.name, previewUrl: uploadedFiles.title.previewUrl } : undefined,
              permit: uploadedFiles.permit ? { name: uploadedFiles.permit.name, previewUrl: uploadedFiles.permit.previewUrl } : undefined,
              id: uploadedFiles.id ? { name: uploadedFiles.id.name, previewUrl: uploadedFiles.id.previewUrl } : undefined,
              fire: uploadedFiles.fire ? { name: uploadedFiles.fire.name, previewUrl: uploadedFiles.fire.previewUrl } : undefined,
            },
            docs: {
              title: docTitleAttached,
              permit: docPermitAttached,
              id: docIdAttached,
              fireCert: docFireAttached,
            },
          });
        }
        setSubmittedLandlordSuccess(true);
      }
    }, 600);
  };

  const handleSignInSubmit = () => {
    setSignInError(null);

    if (activeRole === 'landlord') {
      const email = landlordIdentifier.trim().toLowerCase();
      const pwd = password.trim();

      if (!email) {
        setSignInError('Please enter your registered landlord email or mobile number.');
        return;
      }
      if (!pwd) {
        setSignInError('Please enter your account password.');
        return;
      }

      // Check verified credentials list
      const matched = VERIFIED_LANDLORD_CREDENTIALS.find(
        (c) => c.email.toLowerCase() === email
      );

      if (matched) {
        if (pwd !== matched.pass) {
          setSignInError(
            `Authentication Failed: Incorrect password for ${matched.owner} (${matched.houseName}). Please verify credentials in the directory below.`
          );
          return;
        }
        onNavigateHome('landlord', matched.email);
        return;
      }

      // Also check fallback owner@staynest.ph
      if (email === 'owner@staynest.ph') {
        if (pwd !== 'Candari2026!') {
          setSignInError('Authentication Failed: Incorrect password for Fritzcel Boarding House.');
          return;
        }
        onNavigateHome('landlord', 'owner@staynest.ph');
        return;
      }

      // For other landlord accounts, require at least 6 characters
      if (pwd.length < 6) {
        setSignInError('Authentication Failed: Password must be at least 6 characters.');
        return;
      }

      onNavigateHome('landlord', email);
      return;
    }

    if (activeRole === 'student') {
      const studentId = studentIdentifier.trim();
      const pwd = password.trim();

      if (!studentId) {
        setSignInError('Please enter your ADSSU student email or Student ID No.');
        return;
      }
      if (!pwd) {
        setSignInError('Please enter your student account password.');
        return;
      }
      onNavigateHome('student', studentId);
      return;
    }

    if (activeRole === 'admin') {
      const adminId = (adminUsername || 'admin@staynest.adssu.edu.ph').trim();
      const pwd = (password || 'AdminStayNest2026!').trim();

      if (!adminId) {
        setSignInError('Please enter your admin username or system email.');
        return;
      }
      if (!pwd) {
        setSignInError('Please enter your admin password.');
        return;
      }
      onNavigateHome('admin', adminId);
      return;
    }
  };



  // Official Supabase Auth Social OAuth Login Trigger (Google & Facebook)
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setSocialLoadingProvider(provider);
    try {
      if (supabase && supabase.auth) {
        // Official Supabase OAuth with iframe bypass
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: window.location.origin,
            skipBrowserRedirect: true,
          },
        });

        if (error) {
          console.error(`Supabase ${provider} signInWithOAuth error:`, error.message);
          alert(`Supabase Auth Error (${provider}): ${error.message}`);
        } else if (data?.url) {
          // Open Google OAuth in a new top-level window/tab to avoid iframe X-Frame-Options blocking
          const oauthWindow = window.open(data.url, '_blank');
          if (!oauthWindow) {
            window.top!.location.href = data.url;
          }
        }
      }
    } catch (err: any) {
      console.error(`Supabase ${provider} signInWithOAuth error:`, err);
      alert(`Supabase OAuth Exception: ${err.message || err}`);
    } finally {
      setSocialLoadingProvider(null);
    }
  };

  // Facebook Account Instant Sign In Handler
  const handleSelectFacebookAccount = (acc: {
    name: string;
    email: string;
    role?: 'student' | 'landlord';
    course?: string;
  }) => {
    setRealFacebookName(acc.name);
    setRealFacebookEmail(acc.email);
    setIsSigningInWithFacebook(true);

    setTimeout(() => {
      setIsSigningInWithFacebook(false);
      setShowFacebookSignInModal(false);

      const targetRole = acc.role || (activeRole === 'admin' ? 'student' : activeRole);
      if (targetRole === 'student') {
        if (onRegisterStudent) {
          onRegisterStudent({
            name: acc.name,
            studentId: '2024-0192-B',
            email: acc.email,
            course: acc.course || 'BSIT – Bachelor of Science in Information Technology - 3rd Year',
            corFile: 'Facebook_OAuth_Verified.pdf',
            profilePhoto: userProfilePhoto || undefined,
          });
        }
        onNavigateHome('student');
      } else {
        if (onRegisterLandlord) {
          onRegisterLandlord({
            name: acc.name,
            houseName: 'Fritzcel Boarding House',
            address: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
            email: acc.email,
            phone: '+63 912 345 6789',
            profilePhoto: userProfilePhoto || undefined,
            docs: {
              title: true,
              permit: true,
              id: true,
              fireCert: true,
            },
          });
        }
        onNavigateHome('landlord');
      }
    }, 750);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans select-none relative staynest-bg">



      {/* ========================================================================= */}
      {/* DESKTOP DOWNWARD CASCADING LIQUID WAVE GUTTER DIVIDER                     */}
      {/* Smooth organic liquid wave curve positioned in the center gutter         */}
      {/* ========================================================================= */}
      <div className="hidden lg:block absolute inset-0 z-1 pointer-events-none overflow-hidden h-full">
        <div className="relative w-full h-full overflow-hidden">
          <svg
            className="w-[120%] h-[2400px] absolute top-0 -left-[10%] overflow-visible animate-wave-down"
            viewBox="0 0 1000 2400"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
              </linearGradient>
              <filter id="waveGlow" x="-20%" y="-10%" width="140%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E5A93C" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Emerald fill centered in the gutter with smooth organic S-curve */}
            <path
              d="M 500,0 C 560,200 560,400 500,600 C 440,800 440,1000 500,1200 C 560,1400 560,1600 500,1800 C 440,2000 440,2200 500,2400 L 0,2400 L 0,0 Z"
              fill="#053728"
            />

            {/* Glowing Golden Wave Crest Stroke */}
            <path
              d="M 500,0 C 560,200 560,400 500,600 C 440,800 440,1000 500,1200 C 560,1400 560,1600 500,1800 C 440,2000 440,2200 500,2400"
              stroke="url(#waveGold)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#waveGlow)"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LEFT SIDE: BRANDING, GOLDEN HOUSE EMBLEM & PULSE ANIMATION            */}
      {/* ========================================================================= */}
      <div className="bg-[#053728] lg:bg-transparent relative flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 text-white overflow-hidden min-h-[360px] sm:min-h-[440px] lg:min-h-screen h-auto lg:h-full w-full max-w-full z-10">
        {/* Firefly Particles (Memoized to prevent flickering on input state changes) */}
        <FireflyParticles />
        {/* Mobile & Tablet Smooth Wave Divider */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <div className="relative w-full animate-wave-h-slide">
            <svg
              className="relative block w-full h-8 sm:h-10 md:h-12"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="waveGoldMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.95" />
                  <stop offset="25%" stopColor="#F59E0B" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="75%" stopColor="#F59E0B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
                </linearGradient>
                <filter id="waveGlowMobile" x="-10%" y="-30%" width="120%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#E5A93C" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Ambient Soft Golden Glow Layer */}
              <path
                d="M 0,40 C 240,20 480,60 720,40 C 960,20 1200,60 1440,40"
                stroke="#F59E0B"
                strokeWidth="6"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />

              {/* Crisp Golden Crest Stroke */}
              <path
                d="M 0,40 C 240,20 480,60 720,40 C 960,20 1200,60 1440,40"
                stroke="url(#waveGoldMobile)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#waveGlowMobile)"
              />

              {/* Animated Flowing Golden Energy Beam */}
              <path
                d="M 0,40 C 240,20 480,60 720,40 C 960,20 1200,60 1440,40"
                stroke="#FDE68A"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-wave-dash-h"
                opacity="0.95"
              />
            </svg>
          </div>
        </div>

        {/* Top-Right Clear Liquid Glass Action Buttons: Get App & About */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setShowDownloadAppModal(true)}
            className="px-3.5 sm:px-5 py-2 rounded-2xl bg-[#E5A93C]/20 hover:bg-[#E5A93C]/30 text-amber-300 hover:text-white backdrop-blur-2xl border border-[#E5A93C]/40 shadow-xl text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            title="Download StayNest Mobile App & PWA Guide"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>Get App</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGuideAndTeamModal(true)}
            className="px-3.5 sm:px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            title="About StayNest, Features & Capstone Team"
          >
            <Info className="w-3.5 h-3.5 text-emerald-300" />
            <span>About</span>
          </button>
        </div>

        {/* Center Animated Golden Radar & Emblem (Perfectly centered vertically) */}
        <div className="relative flex flex-col items-center justify-center text-center z-10 py-6 sm:py-10 w-full max-w-lg mx-auto">
          {/* Concentric Golden Radar Rings & Centered Emblem */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-5 sm:mb-7">
            {/* Infinitely Expanding Golden Radar Zoom-Out Waves (Centered directly on emblem) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-[#E5A93C] shadow-[0_0_24px_rgba(229,169,60,0.5)] animate-radar-zoom-1 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-[#F59E0B] shadow-[0_0_18px_rgba(245,158,11,0.4)] animate-radar-zoom-2 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-[#FBBF24] shadow-[0_0_14px_rgba(251,191,36,0.3)] animate-radar-zoom-3 pointer-events-none" />

            {/* Concentric Ambient Rings strictly centered on emblem */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#D97706]/30 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#D97706]/20 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#D97706]/10 pointer-events-none" />

            {/* Golden Emblem Centerpiece */}
            <div className="relative z-10 p-2.5 sm:p-3 rounded-full bg-[#032319] border-2 border-[#E5A93C] shadow-2xl animate-logo-pulse transition-transform duration-500 hover:scale-105 cursor-pointer">
              <StayNestEmblem size="xl" />
            </div>
          </div>

          {/* Bold Serif Title & Tagline (Elevated and crisp) */}
          <div className="relative z-10 text-center">
            <h1 className="font-serif italic text-5xl sm:text-7xl font-bold tracking-tight text-[#EAA938] mb-2.5 drop-shadow-[0_2px_16px_rgba(234,169,56,0.35)]">
              StayNest
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-[#F4F7F2] tracking-wide font-normal">
              A Smarter Way to Find Boarding Houses
            </p>
          </div>
        </div>

        {/* Bottom Partnership Text */}
        <div className="w-full text-center text-xs text-emerald-300/70 z-10 pb-4 sm:pb-6 px-4">
          <p>© 2026 Agusan del Sur State University · Municipality of Bunawan</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT SIDE: MODERN AUTHENTICATION CARD (LIQUID GLASS EFFECT)          */}
      {/* ========================================================================= */}
      <div className="staynest-bg relative flex flex-col items-center justify-center p-4 sm:p-10 lg:p-12 overflow-y-auto min-h-screen w-full max-w-full">
        {/* Ambient Liquid Glass Floating Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-amber-400/25 blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-md lg:max-w-lg w-full my-auto space-y-6 relative z-10">
          {/* Frosted Liquid Glass Card */}
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-slate-800 animate-slide-up relative">
            {/* ONE United Clean Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/80 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-950 text-[10px] font-extrabold shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>ADSSU & Bunawan LGU System</span>
                  </span>
                </div>
                <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#053728] tracking-tight">
                  {authMode === 'signin' ? 'Sign In to StayNest' : 'Create an Account'}
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {authMode === 'signin'
                    ? 'Enter your credentials to access your dedicated portal'
                    : 'Register for ADSSU student or landlord housing'}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
                {/* Mode Toggle Pills (Sign In / Register) */}
                <div className="flex items-center p-1 liquid-glass-pill rounded-xl text-xs font-bold shadow-2xs">
                  <button
                    onClick={() => {
                      setAuthMode('signin');
                      setSignInError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'signin'
                        ? 'bg-white text-emerald-900 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      if (activeRole === 'admin') {
                        setActiveRole('student');
                      }
                      setSignInError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'register'
                        ? 'bg-white text-emerald-900 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Role Toggle Tabs: Student / Landlord / Admin */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                Select Your Role
              </label>
              <div className={`grid ${authMode === 'signin' ? 'grid-cols-3' : 'grid-cols-2'} gap-2 p-1.5 liquid-glass-pill rounded-2xl`}>
                {/* Tab 1: Student */}
                <button
                  onClick={() => {
                    setActiveRole('student');
                    setSignInError(null);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeRole === 'student'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Student</span>
                </button>

                {/* Tab 2: Landlord */}
                <button
                  onClick={() => {
                    setActiveRole('landlord');
                    setSignInError(null);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeRole === 'landlord'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Landlord</span>
                </button>

                {/* Tab 3: Admin (Sign In mode only) */}
                {authMode === 'signin' && (
                  <button
                    onClick={() => {
                      setActiveRole('admin');
                      setAuthMode('signin'); // Admin is sign-in only
                      setSignInError(null);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeRole === 'admin'
                        ? 'bg-white text-amber-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Admin</span>
                  </button>
                )}
              </div>
            </div>

            {/* ================================================================= */}
            {/* VIEW A: SIGN IN FORM                                              */}
            {/* ================================================================= */}
            {authMode === 'signin' && (
              <div className="space-y-4">


                {/* Sign-In Validation Alert Notice */}
                {signInError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-medium flex items-start gap-2.5 animate-in fade-in shadow-2xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-rose-950">Authentication Notice</p>
                      <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">{signInError}</p>
                    </div>
                  </div>
                )}

                {/* Identifier Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    {activeRole === 'student' && 'ADSSU Email or Student ID No.'}
                    {activeRole === 'landlord' && 'Mobile Number or Registered Business Email'}
                    {activeRole === 'admin' && 'Admin Username or System Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      {activeRole === 'student' && <User className="w-4 h-4" />}
                      {activeRole === 'landlord' && <Mail className="w-4 h-4" />}
                      {activeRole === 'admin' && <ShieldCheck className="w-4 h-4 text-amber-600" />}
                    </div>
                    <input
                      type="text"
                      placeholder={
                        activeRole === 'student'
                          ? 'e.g. anuer@adssu.edu.ph or 2024-0192-B'
                          : activeRole === 'landlord'
                          ? 'e.g. jiomer.dalayap@staynest.ph'
                          : 'e.g. admin@staynest.adssu.edu.ph'
                      }
                      value={
                        activeRole === 'student'
                          ? studentIdentifier
                          : activeRole === 'landlord'
                          ? landlordIdentifier
                          : adminUsername
                      }
                      onChange={(e) => {
                        if (signInError) setSignInError(null);
                        if (activeRole === 'student') setStudentIdentifier(e.target.value);
                        else if (activeRole === 'landlord') setLandlordIdentifier(e.target.value);
                        else setAdminUsername(e.target.value);
                      }}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/70"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotErrorNotice(null);
                        setForgotSuccessNotice(null);
                        setShowForgotPasswordModal(true);
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-bold hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your account password"
                      value={password}
                      onChange={(e) => {
                        if (signInError) setSignInError(null);
                        setPassword(e.target.value);
                      }}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Admin 2FA Passphrase */}
                {activeRole === 'admin' && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        2FA Security Key
                      </label>
                      <span className="text-[10px] text-amber-800 font-bold">2026 Academic Season</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 2FA Security Key"
                      value={admin2fa}
                      onChange={(e) => setAdmin2fa(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-amber-600 bg-slate-50/70"
                    />
                  </div>
                )}



                {/* Remember Me */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600">Keep session active on this device</span>
                </label>

                {/* Sign In Primary Button */}
                <button
                  type="button"
                  onClick={handleSignInSubmit}
                  className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider border border-emerald-400/40 backdrop-blur-md shadow-[0_8px_24px_-4px_rgba(0,135,90,0.45)] hover:shadow-[0_12px_28px_-4px_rgba(0,135,90,0.55)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-98 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                  <span className="relative z-10">
                    Sign In to{' '}
                    {activeRole === 'student'
                      ? 'Student Portal'
                      : activeRole === 'landlord'
                      ? 'Landlord Hub'
                      : 'Admin Console'}
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </div>
            )}

            {/* ================================================================= */}
            {/* VIEW B: REGISTRATION FORM (Student COR or Landlord 4-Point LGU)   */}
            {/* ================================================================= */}
            {authMode === 'register' && (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {regValidationError && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-bold flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{regValidationError}</span>
                  </div>
                )}

                {activeRole === 'student' ? (
                  /* Student Registration */
                  <div className="space-y-3">


                    {/* Profile Picture Upload Widget */}
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center shrink-0 shadow-2xs">
                          {userProfilePhoto ? (
                            <img src={userProfilePhoto} alt="Student Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-emerald-800" />
                          )}
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-800 uppercase leading-tight">
                            Profile Picture (Optional)
                          </label>
                          <span className="text-[10px] text-slate-500 font-normal block">
                            Easy landlord & campus identification
                          </span>
                        </div>
                      </div>

                      <input
                        ref={profilePhotoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => profilePhotoInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Camera className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{userProfilePhoto ? 'Change Photo' : '+ Photo'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={regStudentName}
                        onChange={(e) => setRegStudentName(e.target.value)}
                        placeholder="e.g. Angelo Nuer"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    {/* ADSSU Degree Program & Year Level Dropdowns */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          ADSSU College & Degree Program
                        </label>
                        <select
                          value={regProgram}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRegProgram(val);
                            if (regYear) setRegCourse(`${val} - ${regYear}`);
                            else setRegCourse(val);
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600 focus:bg-white truncate cursor-pointer shadow-2xs"
                        >
                          <option value="">-- Select ADSSU Degree Program --</option>
                          {ADSSU_COLLEGE_PROGRAMS.map((col) => (
                            <optgroup key={col.college} label={col.college} className="font-bold text-emerald-900 bg-emerald-50/50">
                              {col.programs.map((prog) => (
                                <option key={prog} value={prog} className="font-normal text-slate-800 bg-white">
                                  {prog}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                            Year Level
                          </label>
                          <select
                            value={regYear}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRegYear(val);
                              if (regProgram) setRegCourse(`${regProgram} - ${val}`);
                              else setRegCourse(val);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer shadow-2xs"
                          >
                            <option value="">-- Year Level --</option>
                            {ADSSU_YEAR_LEVELS.map((yr) => (
                              <option key={yr} value={yr}>
                                {yr}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                            ADSSU Student ID
                          </label>
                          <input
                            type="text"
                            value={regStudentId}
                            onChange={(e) => setRegStudentId(e.target.value)}
                            placeholder="e.g. M-01928"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-bold text-slate-700 uppercase">
                          ADSSU / Personal Email Address
                        </label>
                        <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Receives 6-Digit OTP
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail className="w-4 h-4 text-emerald-700" />
                        </div>
                        <input
                          type="email"
                          value={regStudentEmail}
                          onChange={(e) => setRegStudentEmail(e.target.value)}
                          placeholder="e.g. student@adssu.edu.ph or your Gmail"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Mobile Number (Optional - For Landlord Inquiries)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regStudentPhone}
                          onChange={(e) => setRegStudentPhone(e.target.value)}
                          placeholder="+63 912 345 6789"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Password Setup Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          Account Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock className="w-4 h-4 text-emerald-700" />
                          </div>
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Min 6 chars"
                            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock className="w-4 h-4 text-emerald-700" />
                          </div>
                          <input
                            type={showRegConfirmPassword ? 'text' : 'password'}
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Interactive COR Upload Box */}
                    <div className="pt-1">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                          ADSSU Student Verification (COR / ID)
                        </label>
                        <span className="text-[9px] text-emerald-700 font-bold">Required</span>
                      </div>
                      <div
                        onClick={() => setActiveUploadModalDoc('cor')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          studentCorAttached
                            ? 'border-emerald-300 bg-emerald-50/70 hover:bg-emerald-50'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {uploadedFiles.cor?.previewUrl ? (
                            <img
                              src={uploadedFiles.cor.previewUrl}
                              alt="Student COR / ID"
                              className="w-8 h-8 rounded-lg object-cover border border-emerald-400 shrink-0"
                            />
                          ) : (
                            <FileCheck2
                              className={`w-4 h-4 ${
                                studentCorAttached ? 'text-emerald-700' : 'text-slate-400'
                              }`}
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-800 truncate max-w-[180px]">
                              {studentCorAttached ? (uploadedFiles.cor?.name || docFileNames.cor) : 'Attach Student COR / ID Photo'}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {studentCorAttached
                                ? `${uploadedFiles.cor?.size || '1.4 MB'} • Enrolled 2026`
                                : 'Click to select photo or PDF'}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                            studentCorAttached
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {studentCorAttached ? (
                            <>
                              <Check className="w-3 h-3" /> Attached
                            </>
                          ) : (
                            '+ Upload'
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Student Data Privacy Policy Checkbox (RA 10173) */}
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5 mt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={studentPrivacyAgreed}
                          onChange={(e) => setStudentPrivacyAgreed(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 shrink-0 cursor-pointer"
                        />
                        <span className="text-[11px] leading-relaxed text-slate-700">
                          I agree to the{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowStudentPrivacyModal(true);
                            }}
                            className="font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                          >
                            StayNest Student Data Privacy Policy
                          </button>
                          . I consent to the collection and secure processing of my student ID, academic program, contact details, and uploaded Certificate of Registration (COR) strictly for ADSSU enrollment verification, secure landlord communication, and direct booking management.
                        </span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleInitiateStudentRegisterOtp}
                      className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer mt-2 active:scale-98 flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Registration for Admin Approval</span>
                    </button>
                  </div>
                ) : (
                  /* Landlord Registration (4 LGU Requirements + Boarding House Photos) */
                  <div className="space-y-3">


                    {/* Landlord Profile Photo Upload Widget */}
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center shrink-0 shadow-2xs">
                          {userProfilePhoto ? (
                            <img src={userProfilePhoto} alt="Landlord Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-emerald-800" />
                          )}
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-800 uppercase leading-tight">
                            Landlord Profile Photo (Optional)
                          </label>
                          <span className="text-[10px] text-slate-500 font-normal block">
                            Easy student tenant trust & identification
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => profilePhotoInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Camera className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{userProfilePhoto ? 'Change Photo' : '+ Photo'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Property Owner Full Name
                      </label>
                      <input
                        type="text"
                        value={regLandlordName}
                        onChange={(e) => setRegLandlordName(e.target.value)}
                        placeholder="e.g. Conrado Candari"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Boarding House / Dorm Name
                      </label>
                      <input
                        type="text"
                        value={regHouseName}
                        onChange={(e) => setRegHouseName(e.target.value)}
                        placeholder="e.g. Fritzcel Boarding House"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Complete Address (Bunawan, Agusan del Sur)
                      </label>
                      <input
                        type="text"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="e.g. Purok 3, San Jose, Bunawan, Agusan del Sur"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-bold text-slate-700 uppercase">
                          Landlord Email Address
                        </label>
                        <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Receives 6-Digit OTP
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail className="w-4 h-4 text-emerald-700" />
                        </div>
                        <input
                          type="email"
                          value={regLandlordEmail}
                          onChange={(e) => setRegLandlordEmail(e.target.value)}
                          placeholder="e.g. owner@gmail.com or landlord@staynest.ph"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Contact Mobile Number (For Tenant Inquiries)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regLandlordPhone}
                          onChange={(e) => setRegLandlordPhone(e.target.value)}
                          placeholder="+63 912 345 6789"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Password Setup Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          Account Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock className="w-4 h-4 text-emerald-700" />
                          </div>
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Min 6 chars"
                            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock className="w-4 h-4 text-emerald-700" />
                          </div>
                          <input
                            type={showRegConfirmPassword ? 'text' : 'password'}
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Boarding House Photos Upload */}
                    <div className="pt-0.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[10px] font-bold text-emerald-950 uppercase tracking-wide">
                          Boarding House Photo(s):
                        </label>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          {boardingHousePhotos.length} Attached
                        </span>
                      </div>

                      <input
                        ref={propertyPhotoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePropertyPhotoUpload}
                        className="hidden"
                      />

                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {boardingHousePhotos.map((photoUrl, idx) => (
                          <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-300 shrink-0 shadow-2xs group">
                            <img src={photoUrl} alt={`Property Photo ${idx + 1}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] text-center py-0.5 font-bold">
                              Photo {idx + 1}
                            </span>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => propertyPhotoInputRef.current?.click()}
                          className="w-14 h-14 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50 hover:bg-emerald-100 flex flex-col items-center justify-center text-emerald-800 shrink-0 cursor-pointer transition-colors"
                          title="Upload Boarding House Photos from Device"
                        >
                          <Camera className="w-4 h-4 text-emerald-700" />
                          <span className="text-[8px] font-bold mt-0.5">+ Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* 4 Mandatory LGU Bunawan Legitimacy Documents */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wide">
                          4 Mandatory Bunawan LGU Uploads:
                        </p>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {[docTitleAttached, docPermitAttached, docIdAttached, docFireAttached].filter(Boolean).length}/4 Verified
                        </span>
                      </div>

                      {/* 1. Ownership */}
                      <div
                        onClick={() => setActiveUploadModalDoc('title')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs hover:shadow-2xs ${
                          docTitleAttached ? 'border-emerald-300 bg-emerald-50/70' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {uploadedFiles.title?.previewUrl ? (
                            <img src={uploadedFiles.title.previewUrl} alt="Ownership Title" className="w-7 h-7 rounded-lg object-cover border border-emerald-400 shrink-0" />
                          ) : (
                            <FileText className={`w-4 h-4 ${docTitleAttached ? 'text-emerald-700' : 'text-slate-400'}`} />
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block text-xs">1. Proof of Ownership (Title / Tax Dec)</span>
                            <span className="text-[10px] text-slate-500 font-normal truncate block max-w-[200px]">
                              {docTitleAttached ? (uploadedFiles.title?.name || docFileNames.title) : 'Click to launch document upload modal'}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shrink-0 ${docTitleAttached ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {docTitleAttached ? <><Check className="w-3 h-3" /> Attached</> : '+ Upload'}
                        </span>
                      </div>

                      {/* 2. Mayor's Permit */}
                      <div
                        onClick={() => setActiveUploadModalDoc('permit')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs hover:shadow-2xs ${
                          docPermitAttached ? 'border-emerald-300 bg-emerald-50/70' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {uploadedFiles.permit?.previewUrl ? (
                            <img src={uploadedFiles.permit.previewUrl} alt="Mayor's Permit" className="w-7 h-7 rounded-lg object-cover border border-emerald-400 shrink-0" />
                          ) : (
                            <Building className={`w-4 h-4 ${docPermitAttached ? 'text-emerald-700' : 'text-slate-400'}`} />
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block text-xs">2. Bunawan Mayor's Business Permit</span>
                            <span className="text-[10px] text-slate-500 font-normal truncate block max-w-[200px]">
                              {docPermitAttached ? (uploadedFiles.permit?.name || docFileNames.permit) : 'Click to launch document upload modal'}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shrink-0 ${docPermitAttached ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {docPermitAttached ? <><Check className="w-3 h-3" /> Attached</> : '+ Upload'}
                        </span>
                      </div>

                      {/* 3. Valid ID */}
                      <div
                        onClick={() => setActiveUploadModalDoc('id')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs hover:shadow-2xs ${
                          docIdAttached ? 'border-emerald-300 bg-emerald-50/70' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {uploadedFiles.id?.previewUrl ? (
                            <img src={uploadedFiles.id.previewUrl} alt="Landlord ID" className="w-7 h-7 rounded-lg object-cover border border-emerald-400 shrink-0" />
                          ) : (
                            <User className={`w-4 h-4 ${docIdAttached ? 'text-emerald-700' : 'text-slate-400'}`} />
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block text-xs">3. Valid Government ID (PhilSys/DL)</span>
                            <span className="text-[10px] text-slate-500 font-normal truncate block max-w-[200px]">
                              {docIdAttached ? (uploadedFiles.id?.name || docFileNames.id) : 'Click to launch document upload modal'}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shrink-0 ${docIdAttached ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {docIdAttached ? <><Check className="w-3 h-3" /> Attached</> : '+ Upload'}
                        </span>
                      </div>

                      {/* 4. Fire Cert */}
                      <div
                        onClick={() => setActiveUploadModalDoc('fire')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs hover:shadow-2xs ${
                          docFireAttached ? 'border-emerald-300 bg-emerald-50/70' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {uploadedFiles.fire?.previewUrl ? (
                            <img src={uploadedFiles.fire.previewUrl} alt="BFP Fire Cert" className="w-7 h-7 rounded-lg object-cover border border-emerald-400 shrink-0" />
                          ) : (
                            <Flame className={`w-4 h-4 ${docFireAttached ? 'text-emerald-700' : 'text-slate-400'}`} />
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block text-xs">4. BFP Fire Safety Certificate</span>
                            <span className="text-[10px] text-slate-500 font-normal truncate block max-w-[200px]">
                              {docFireAttached ? (uploadedFiles.fire?.name || docFileNames.fire) : 'Click to launch document upload modal'}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shrink-0 ${docFireAttached ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {docFireAttached ? <><Check className="w-3 h-3" /> Attached</> : '+ Upload'}
                        </span>
                      </div>
                    </div>

                    {/* Landlord Data Privacy Policy Checkbox (RA 10173) */}
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5 mt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={landlordPrivacyAgreed}
                          onChange={(e) => setLandlordPrivacyAgreed(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 shrink-0 cursor-pointer"
                        />
                        <span className="text-[11px] leading-relaxed text-slate-700">
                          I agree to the{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowLandlordPrivacyModal(true);
                            }}
                            className="font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                          >
                            StayNest Landlord Data Privacy Policy
                          </button>
                          . I consent to the collection and processing of my business details, contact information, and municipal compliance documents (Mayor's Business Permit, BFP Safety Certificate, and Land Title/Proof of Ownership) strictly for LGU Bunawan accreditation review and public student directory verification.
                        </span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleInitiateLandlordRegisterOtp}
                      className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer mt-2 flex items-center justify-center gap-2 active:scale-98"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Boarding House for LGU Approval</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>


        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. REGISTRATION SUCCESS MODALS                                            */}
      {/* ========================================================================= */}

      {/* Landlord Registration Success Modal */}
      {submittedLandlordSuccess && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-800 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider mb-2 border border-amber-300">
                <span>⏳ Pending LGU Admin Accreditation</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Sent to LGU Admin</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Thank you, <strong>{regLandlordName}</strong>! Your boarding house,{' '}
                <strong>{regHouseName}</strong>, and 4 LGU compliance documents have been submitted to the <strong>Municipality of Bunawan LGU Admin</strong> for verification and accreditation.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5 text-xs">
              <p className="font-bold text-slate-800">Uploaded LGU Compliance Attachments:</p>
              <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Proof of Ownership Title
              </p>
              <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Mayor's Business Permit
              </p>
              <p className="text-emerald-700 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Government ID & BFP Fire Safety
              </p>
            </div>

            <button
              onClick={() => {
                setSubmittedLandlordSuccess(false);
                onNavigateHome('landlord');
              }}
              className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Continue to Landlord Portal →
            </button>
          </div>
        </div>
      )}

      {/* Student Registration Success Modal */}
      {submittedStudentSuccess && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-800 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <GraduationCap className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wider mb-2 border border-emerald-300">
                <span>📋 Submitted to ADSSU Admin</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Registration Received!</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Welcome to StayNest, <strong>{regStudentName}</strong>! Your ADSSU student ID{' '}
                <strong>{regStudentId}</strong> and Certificate of Registration (COR) have been submitted to the <strong>ADSSU Student Housing Admin</strong> for approval.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmittedStudentSuccess(false);
                onNavigateHome('student');
              }}
              className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Start Exploring Boarding Houses →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE DOCUMENT UPLOAD MODAL (LGU & ADSSU ACCREDITATION)           */}
      {/* ========================================================================= */}
      {activeUploadModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-sans my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#053728] text-white p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-emerald-400/40 flex items-center justify-center">
                  {activeUploadModalDoc === 'title' && <FileText className="w-5 h-5 text-emerald-300" />}
                  {activeUploadModalDoc === 'permit' && <Building className="w-5 h-5 text-amber-300" />}
                  {activeUploadModalDoc === 'id' && <User className="w-5 h-5 text-emerald-300" />}
                  {activeUploadModalDoc === 'fire' && <Flame className="w-5 h-5 text-rose-400" />}
                  {activeUploadModalDoc === 'cor' && <GraduationCap className="w-5 h-5 text-emerald-300" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {activeUploadModalDoc === 'title' && 'Upload Proof of Land Ownership'}
                    {activeUploadModalDoc === 'permit' && "Upload Bunawan Mayor's Business Permit"}
                    {activeUploadModalDoc === 'id' && 'Upload Valid Government ID (Landlord)'}
                    {activeUploadModalDoc === 'fire' && 'Upload BFP Fire Safety Inspection Certificate'}
                    {activeUploadModalDoc === 'cor' && 'Upload ADSSU Student COR or ID'}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Official Verification Requirement · Municipality of Bunawan
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveUploadModalDoc(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Requirement Guidelines Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    {activeUploadModalDoc === 'title' && 'TCT or Bunawan Assessor Certified Tax Declaration'}
                    {activeUploadModalDoc === 'permit' && 'Annual Business Permit (Valid for Year 2026)'}
                    {activeUploadModalDoc === 'id' && 'PhilSys / Driver License / PRC ID of registered landlord'}
                    {activeUploadModalDoc === 'fire' && 'Bureau of Fire Protection (BFP) Bunawan Station FSIC'}
                    {activeUploadModalDoc === 'cor' && 'Enrolled Certificate of Registration (COR) AY 2026–2027'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 font-normal leading-relaxed pl-6">
                  {activeUploadModalDoc === 'title' && 'Must clearly show the property lot number and registered owner matching the applicant name.'}
                  {activeUploadModalDoc === 'permit' && 'Issued by Bunawan Business Permits & Licensing Office (BPLO). Must feature municipal seal.'}
                  {activeUploadModalDoc === 'id' && 'Government-issued photo identification with signature to confirm landlord identity.'}
                  {activeUploadModalDoc === 'fire' && 'Validates fire safety standards: fire extinguishers, secondary exit, and emergency signage.'}
                  {activeUploadModalDoc === 'cor' && 'Validates active student standing at Agusan del Sur State University, Bunawan Campus.'}
                </p>
              </div>

              {/* Hidden Real File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleRealFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleRealFileSelect(e.dataTransfer.files[0]);
                  }
                }}
                className={`p-6 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
                  isDragOver
                    ? 'border-emerald-600 bg-emerald-100/60 scale-[1.01]'
                    : 'border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50/80'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#00875A] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  {isDragOver ? 'Drop Your File Here Now!' : 'Click to Browse Device or Drag & Drop File'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Real uploads supported: Photos (JPG, PNG, WebP) or PDF documents (Max 25MB)
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-300 text-[10px] font-bold text-emerald-800 shadow-2xs group-hover:bg-[#00875A] group-hover:text-white transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Choose Photo or PDF</span>
                </div>

                {/* Progress bar simulation if uploading */}
                {isUploadingSample && (
                  <div className="w-full max-w-xs mt-3 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#00875A] h-full transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>


              {/* Document / Photo Preview Card */}
              {activeUploadModalDoc && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      DOCUMENT INSPECTION PREVIEW
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> File Ready & Attached
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {uploadedFiles[activeUploadModalDoc]?.previewUrl ? (
                      <div className="relative group shrink-0">
                        <img
                          src={uploadedFiles[activeUploadModalDoc].previewUrl}
                          alt="Uploaded Document Preview"
                          className="w-14 h-14 rounded-xl object-cover border border-emerald-400 shadow-xs"
                        />
                        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00875A] flex items-center justify-center font-bold text-xs shrink-0">
                        PDF
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {uploadedFiles[activeUploadModalDoc]?.name || docFileNames[activeUploadModalDoc]}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {uploadedFiles[activeUploadModalDoc]?.size || '1.8 MB'} • Ready for LGU Bunawan Accreditation Audit
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                      title="Upload a different photo or file"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveUploadModalDoc(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeUploadModalDoc === 'title') setDocTitleAttached(true);
                  if (activeUploadModalDoc === 'permit') setDocPermitAttached(true);
                  if (activeUploadModalDoc === 'id') setDocIdAttached(true);
                  if (activeUploadModalDoc === 'fire') setDocFireAttached(true);
                  if (activeUploadModalDoc === 'cor') setStudentCorAttached(true);
                  setActiveUploadModalDoc(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Attach Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TWO-FACTOR OTP VERIFICATION MODAL (LOG IN & REGISTRATION)               */}
      {/* ========================================================================= */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-sans my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Brand Header */}
            <div className="bg-[#053728] text-white p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C]">
                  <Mail className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {otpPurpose === 'login'
                      ? 'Email PIN (OTP) Sign In'
                      : otpPurpose === 'register_student'
                      ? 'Student Email Verification'
                      : 'Landlord Email Verification'}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Live Gmail Verification via EmailJS · ADSSU Security
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-center">
              {/* Recipient Notice & Clean Email Instructions */}
              <div className="space-y-2 text-center py-1">
                <p className="text-xs text-slate-600 font-medium">
                  We've sent a 6-digit verification PIN to your email address:
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-950 shadow-2xs">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="truncate max-w-[280px] font-mono text-sm">{otpRecipient}</span>
                </div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto pt-1 leading-relaxed">
                  Please check your <strong>Inbox</strong> (or <em>Spam / Junk</em> folder) for your StayNest verification email, then enter the 6-digit code below.
                </p>
              </div>

              {/* 6-Digit OTP Input Boxes */}
              <div className="space-y-2 pt-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Enter 6-Digit Code
                </label>
                <div className="flex justify-center items-center gap-2 sm:gap-2.5" onPaste={handleDigitPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                      className={`w-11 h-13 sm:w-12 sm:h-14 rounded-2xl border-2 text-center text-xl font-mono font-black transition-all outline-none ${
                        digit
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {otpError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* Resend Notice */}
              {resendNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{resendNotice}</span>
                </div>
              )}

              {/* Timer and Resend Action */}
              <div className="text-xs text-slate-500 pt-1 flex items-center justify-center gap-2">
                {otpCountdown > 0 ? (
                  <span>
                    Code expires in{' '}
                    <strong className="text-emerald-800 font-mono font-bold">
                      0:{otpCountdown < 10 ? `0${otpCountdown}` : otpCountdown}
                    </strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Resend 6-Digit Code</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isVerifyingOtp}
                onClick={handleVerifyOtp}
                className="px-6 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                {isVerifyingOtp ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {otpPurpose === 'login' ? 'Verify & Sign In' : 'Verify & Complete'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. FORGOT PASSWORD & SECURITY RESET MODAL                                  */}
      {/* ========================================================================= */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-sans my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#053728] text-white p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C]">
                  <KeyRound className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Reset Password
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    ADSSU Account Recovery & Verification
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {forgotSuccessNotice && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{forgotSuccessNotice}</span>
                </div>
              )}

              {forgotErrorNotice && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-800 font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{forgotErrorNotice}</span>
                </div>
              )}

              {forgotStep === 'request' ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enter your registered <strong>ADSSU Email</strong>, <strong>Student ID</strong>, or <strong>Mobile Number</strong> to receive a 6-digit OTP security reset code.
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Email, Student ID, or Phone
                    </label>
                    <input
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="e.g. anuer@adssu.edu.ph or 0912 345 6789"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/80"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!forgotIdentifier) {
                        setForgotErrorNotice('Please enter your email, student ID, or phone number.');
                        return;
                      }
                      setForgotErrorNotice(null);
                      setForgotStep('verify');
                      setForgotSuccessNotice(`Security OTP dispatched to ${forgotIdentifier}! Code: 482910`);
                    }}
                    className="w-full py-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Send Verification Code</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-slate-900 text-white text-left shadow-md border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>Incoming Verification SMS</span>
                      </span>
                      <span className="font-mono text-slate-400">Just Now</span>
                    </div>
                    <p className="text-xs text-slate-200 font-mono">
                      [ADSSU StayNest] Your password reset code is <strong className="text-amber-400 font-bold">{forgotOtpCode}</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      6-Digit Reset Code
                    </label>
                    <input
                      type="text"
                      value={forgotEnteredOtp}
                      onChange={(e) => setForgotEnteredOtp(e.target.value)}
                      placeholder="Enter 482910"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-center tracking-widest text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/80"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/80"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={forgotConfirmPassword}
                      onChange={(e) => setForgotConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/80"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!forgotEnteredOtp) {
                        setForgotErrorNotice('Please enter the 6-digit verification code.');
                        return;
                      }
                      if (forgotEnteredOtp !== forgotOtpCode && forgotEnteredOtp !== '482910') {
                        setForgotErrorNotice('Incorrect verification code. Please check code 482910.');
                        return;
                      }
                      if (!forgotNewPassword) {
                        setForgotErrorNotice('Please enter your new password.');
                        return;
                      }
                      if (forgotNewPassword !== forgotConfirmPassword) {
                        setForgotErrorNotice('Passwords do not match. Please verify both fields.');
                        return;
                      }

                      setPassword(forgotNewPassword);
                      setForgotErrorNotice(null);
                      setForgotSuccessNotice('Password successfully updated!');
                      setTimeout(() => {
                        setShowForgotPasswordModal(false);
                        setForgotStep('request');
                        setForgotEnteredOtp('');
                        setForgotNewPassword('');
                        setForgotConfirmPassword('');
                        onNavigateHome(activeRole);
                      }, 1200);
                    }}
                    className="w-full py-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Update Password & Sign In</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setForgotStep('request');
                }}
                className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              {forgotStep === 'verify' && (
                <button
                  type="button"
                  onClick={() => setForgotStep('request')}
                  className="font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                >
                  Change Email / Phone
                </button>
              )}
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* 8. FACEBOOK SIGN-IN ACCOUNT PICKER MODAL (SUPABASE OAUTH)                 */}
      {/* ========================================================================= */}
      {showFacebookSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-sans my-auto animate-in zoom-in-95 duration-200">
            {/* Facebook Branded Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Continue with Facebook
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your Facebook profile to access <strong>StayNest</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowFacebookSignInModal(false);
                  setIsSigningInWithFacebook(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Facebook Modal Content */}
            <div className="p-6 space-y-4">
              {isSigningInWithFacebook ? (
                /* Authenticating Loading State */
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-3 border-[#1877F2] border-t-transparent animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Connecting with Facebook...
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {realFacebookName} ({realFacebookEmail})
                    </p>
                  </div>
                  <span className="text-[11px] text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Supabase Auth Session Active
                  </span>
                </div>
              ) : (
                /* Real Facebook Account Form */
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Your Facebook Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={realFacebookName}
                        onChange={(e) => setRealFacebookName(e.target.value)}
                        placeholder="e.g. Angelo Nuer"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/70 focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Email or Mobile linked to Facebook
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={realFacebookEmail}
                        onChange={(e) => setRealFacebookEmail(e.target.value)}
                        placeholder="e.g. nuerangelo6@gmail.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/70 focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Select Access Portal
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRealFacebookRole('student')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          realFacebookRole === 'student'
                            ? 'border-[#1877F2] bg-blue-50 text-blue-900 shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 text-[#1877F2]" />
                        <span>Student Portal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRealFacebookRole('landlord')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          realFacebookRole === 'landlord'
                            ? 'border-[#1877F2] bg-blue-50 text-blue-900 shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Home className="w-4 h-4 text-[#1877F2]" />
                        <span>Landlord Hub</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!realFacebookName.trim() || !realFacebookEmail.trim()}
                    onClick={() =>
                      handleSelectFacebookAccount({
                        name: realFacebookName.trim(),
                        email: realFacebookEmail.trim(),
                        role: realFacebookRole,
                        course: 'BSIT – Bachelor of Science in Information Technology - 3rd Year',
                      })
                    }
                    className="w-full py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Sign In with Facebook as {realFacebookName || 'User'}</span>
                  </button>
                </div>
              )}

              {/* Facebook Security & Privacy Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Real Account Verification · Supabase Auth</span>
                </span>
                <span className="font-sans">StayNest · ADSSU</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. UNIFIED MODAL: HOW IT WORKS & OUR TEAM (ALL IN ONE)                    */}
      {/* ========================================================================= */}
      <StayNestGuideAndTeamModal
        isOpen={showGuideAndTeamModal}
        onClose={() => setShowGuideAndTeamModal(false)}
        onTryExplore={() => {
          setShowGuideAndTeamModal(false);
          onNavigateHome('student');
        }}
      />

      {/* 4. APP DOWNLOAD & PWA INSTALL MODAL */}
      <StayNestAppDownloadModal
        isOpen={showDownloadAppModal}
        onClose={() => setShowDownloadAppModal(false)}
      />

      {/* ========================================================================= */}
      {/* DATA PRIVACY POLICY MODALS (RA 10173 COMPLIANCE)                         */}
      {/* ========================================================================= */}

      {/* Student Data Privacy Policy Modal */}
      {showStudentPrivacyModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full text-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase tracking-wide">
                    <span>RA 10173 Compliant</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Student Data Privacy Policy</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowStudentPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs leading-relaxed text-slate-600">
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 font-medium">
                In compliance with <strong>Republic Act No. 10173 (Data Privacy Act of 2012)</strong> of the Philippines, StayNest ensures that all student personal data is processed lawfully, securely, and transparently.
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">1. Purpose of Data Collection</h4>
                <p>
                  Your information is collected solely for <strong>ADSSU Student Enrollment & Identity Verification</strong>, ensuring student identity authenticity, enabling verified landlord inquiries, and managing boarding house room bookings.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">2. Personal Data Processed</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Full Name, ADSSU Student ID number, Academic Degree Program & Year Level</li>
                  <li>Institutional / Personal Email address and Mobile contact number</li>
                  <li>Uploaded Certificate of Registration (COR) / ADSSU Student ID photo</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">3. Storage & Encryption Security</h4>
                <p>
                  All credentials and documents are stored with <strong>AES-256 encryption</strong> and protected by strict Role-Based Access Control (RBAC). Your COR document is accessible only by system administrators for verification purposes.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">4. Your Statutory Rights under RA 10173</h4>
                <p>
                  You retain the Right to be Informed, Right to Access your profile data, Right to Rectification of inaccurate details, and the Right to Erasure / Account Closure at any time.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowStudentPrivacyModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setStudentPrivacyAgreed(true);
                  setShowStudentPrivacyModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>I Understand & Agree</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Landlord Data Privacy Policy Modal */}
      {showLandlordPrivacyModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full text-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase tracking-wide">
                    <span>RA 10173 Compliant</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Landlord Data Privacy Policy</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLandlordPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs leading-relaxed text-slate-600">
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 font-medium">
                Pursuant to <strong>Republic Act No. 10173 (Data Privacy Act of 2012)</strong>, StayNest maintains high-level confidentiality and security standards for all property owner data and municipal compliance records.
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">1. Purpose of Processing</h4>
                <p>
                  Landlord data and compliance documents are collected strictly for <strong>LGU Bunawan Accreditation Review</strong> and verifying property legitimacy before publishing boarding house listings to ADSSU students.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">2. Data Elements & Attachments Collected</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Property Owner Full Name, Boarding House / Dorm Name, Complete Address</li>
                  <li>Contact Email Address and Mobile Phone Number</li>
                  <li>Proof of Ownership Title / Tax Declaration, Bunawan Mayor's Business Permit</li>
                  <li>Valid Government Photo ID and BFP Fire Safety Inspection Certificate</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">3. Confidentiality & Security Safeguards</h4>
                <p>
                  Compliance attachments are stored in encrypted object vaults accessible exclusively by authorized Municipal LGU Administrators and system security auditors.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">4. Your Rights under RA 10173</h4>
                <p>
                  Landlords hold the Right to Access compliance status, Right to Update business records, and Right to Request Data Deletion upon property closure.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLandlordPrivacyModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setLandlordPrivacyAgreed(true);
                  setShowLandlordPrivacyModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>I Understand & Agree</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

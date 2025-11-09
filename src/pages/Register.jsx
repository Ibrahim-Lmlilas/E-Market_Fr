import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';
import eStoreLogo from '../assets/images/e-store.png';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Form submitted:', formData);
        alert('Account created successfully!');
    };

    return (
        <div className="flex flex-col md:flex-row gap-40 items-center">
            {/* Left side - Store illustration */}
            <div className="hidden md:flex w-2/5 justify-center">
                <img
                    src={eStoreLogo}
                    srcSet="/e-store@2x.png 2x, /e-store@3x.png 3x"
                    alt="store on mobile"
                    className="w-full object-contain"
                />
            </div>

            {/* Right side - Registration form */}
            <div className="w-full md:w-3/5 lg:w-2/5 flex flex-col items-center">
                {/* Logo */}
                <Logo />

                {/* Form container */}
                <div className="w-11/12 border border-primary rounded-lg p-6 lg:p-8 bg-background mb-10">
                    {/* Form header */}
                    <h1 className="text-textMain text-xl lg:text-2xl font-semibold text-center mb-6">
                        Create Your Account And<br />Start Shopping :)
                    </h1>

                    <div className="space-y-10 w-full lg:px-10 ">
                        {/* Full Name */}
                        <div>
                            <label className="block text-textMain text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Jhone Doe"
                                className="w-full bg-surface  border border-border rounded-lg px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-textMain text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="jhon@example.com"
                                className="w-full bg-surface  border border-border rounded-lg px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-textMain text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full bg-surface  border border-border rounded-lg px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textMain transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-textMain text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full bg-surface  border border-border rounded-lg px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textMain transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 accent-primary"
                            />
                            <label htmlFor="terms" className="text-sm text-textMuted">
                                I agree to the{' '}
                                <a href="#" className="text-primary hover:text-emerald-400">
                                    Terms of Service
                                </a>
                                {' '}and{' '}
                                <a href="#" className="text-primary hover:text-emerald-400">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-emerald-600 text-textMain font-semibold py-3 rounded-lg transition-colors"
                        >
                            Sign Up
                        </button>

                        {/* Sign in link */}
                        <div className="text-center text-sm text-textMuted">
                            Already have an account?{' '}
                            <a href="#" className="text-primary hover:text-emerald-400">
                                Sign in
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';
import eStoreLogo from '../assets/images/e-store.png';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
            <div className="w-full md:w-3/5 lg:w-1/3 flex flex-col items-center">
                {/* Logo */}
                <Logo />

                {/* Form container */}
                <div className="w-11/12 border border-primary rounded-lg p-6 lg:p-8 bg-background mb-10">
                    {/* Form header */}
                    <h1 className="text-textMain text-xl lg:text-2xl font-semibold text-center mb-6">
                        Create Your Account And<br />Start Shopping :)
                    </h1>

                    <div className="space-y-10 w-full lg:px-10 ">
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

                        {/* remember me/forgot password */}
                        <div className="flex justify-between w-full">
                            {/* Remember me*/}
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="mt-1 w-4 h-4 accent-primary"
                                />
                                <label htmlFor="terms" className="text-sm text-textMuted">
                                    Remember Me
                                </label>
                            </div>

                            {/* Forgot Password*/}
                            <div className="flex items-start gap-2">

                                <a htmlFor="terms" className="text-sm text-primary">
                                    Forgot Passwor?
                                </a>
                            </div>

                        </div>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-emerald-600 text-textMain font-semibold py-3 rounded-lg transition-colors"
                        >
                            Sign In
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

export default Login;
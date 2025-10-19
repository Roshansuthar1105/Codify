import React from 'react';
import { getPasswordStrength, getPasswordStrengthLabel, getPasswordStrengthColor, getPasswordStrengthBgColor, validatePassword } from '../utils/passwordUtils'; // Adjust path if needed

const PasswordStrength = ({ password, isDark = false }) => {
    if (!password) return null;

    const strength = getPasswordStrength(password);
    const label = getPasswordStrengthLabel(strength);
    const colorClass = getPasswordStrengthColor(strength);
    const bgColorClass = getPasswordStrengthBgColor(strength);
    const validation = validatePassword(password);

    const progress = (strength / 6) * 100;

    const requirements = [
        { test: password.length >= 8, text: 'At least 8 characters' },
        { test: /[A-Z]/.test(password), text: 'One uppercase letter (A-Z)' },
        { test: /[a-z]/.test(password), text: 'One lowercase letter (a-z)' },
        { test: /[0-9]/.test(password), text: 'One number (0-9)' },
        { test: /[!@#$%^&*(),.?":{}|<>_]/.test(password), text: 'One special character (!@#$...)' }
    ];

    return (
        <div className={`mt-3 p-4 rounded-lg border transition-all duration-300 ${
            isDark 
                ? 'bg-white/5 backdrop-blur-sm border-white/10' 
                : 'bg-white/50 backdrop-blur-sm border-white/30'
        }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password Strength:
                </span>
                <span className={`text-sm font-bold ${colorClass}`}>{label}</span>
            </div>
            
            {/* Progress Bar */}
            <div className={`w-full rounded-full h-2 mb-4 overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${bgColorClass}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-2">
                {requirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                        <span className={`mr-2 font-bold text-base ${
                            req.test 
                                ? 'text-green-500' 
                                : (isDark ? 'text-gray-500' : 'text-gray-400')
                        }`}>
                            {req.test ? '✓' : '○'}
                        </span>
                        <span className={`${
                            req.test 
                                ? (isDark ? 'text-gray-300' : 'text-gray-700')
                                : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}>
                            {req.text}
                        </span>
                    </div>
                ))}
            </div>
             
            {/* Final Validation Message */}
            {validation.isValid && (
                <div className={`mt-3 pt-3 border-t text-sm font-semibold flex items-center ${isDark ? 'border-white/10 text-green-400' : 'border-gray-300 text-green-600'}`}>
                   ✓ Password meets all requirements!
                </div>
            )}
        </div>
    );
};

export default PasswordStrength;
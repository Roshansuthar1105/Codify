export const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    
    if (password.length >= 8) score++;

    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>_]/.test(password)) score++;
    
    return score;
};

export const getPasswordStrengthLabel = (score) => {
    switch (score) {
        case 0:
        case 1: return 'Very Weak';
        case 2: return 'Weak';
        case 3: return 'Fair';
        case 4: return 'Good';
        case 5: return 'Strong';
        case 6: return 'Very Strong';
        default: return 'Unknown';
    }
};

export const getPasswordStrengthColor = (score) => {
    switch (score) {
        case 0:
        case 1: return 'text-red-500';
        case 2: return 'text-orange-500';
        case 3: return 'text-yellow-500';
        case 4: return 'text-blue-500';
        case 5: return 'text-green-500';
        case 6: return 'text-green-600';
        default: return 'text-gray-500';
    }
};

export const getPasswordStrengthBgColor = (score) => {
    switch (score) {
        case 0:
        case 1: return 'bg-red-500';
        case 2: return 'bg-orange-500';
        case 3: return 'bg-yellow-500';
        case 4: return 'bg-blue-500';
        case 5: return 'bg-green-500';
        case 6: return 'bg-green-600';
        default: return 'bg-gray-400';
    }
};

export const validatePassword = (password) => {
    const errors = [];

    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
};
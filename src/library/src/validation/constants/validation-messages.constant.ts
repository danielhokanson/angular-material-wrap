/**
 * Default validation error messages with placeholder support.
 * Use {field} for field name, {requiredLength}, {min}, {max}, etc. for error values.
 */
export const VALIDATION_MESSAGES: Record<string, string> = {
    // Built-in Angular validators
    required: '{field} is required',
    email: 'Please enter a valid email address',
    minlength: '{field} must be at least {requiredLength} characters',
    maxlength: '{field} cannot exceed {requiredLength} characters',
    min: '{field} must be at least {min}',
    max: '{field} cannot exceed {max}',
    pattern: '{field} format is invalid',

    // Custom validators
    mismatch: 'Fields do not match',
    passwordMismatch: 'Passwords do not match',
    invalidUrl: 'Please enter a valid URL',
    invalidUrlStrict: 'Please enter a valid URL (must start with http:// or https://)',
    positiveNumber: '{field} must be a positive number',
    nonNegativeNumber: '{field} must be zero or greater',
    arrayMinLength: '{field} must have at least {min} items',
    arrayMaxLength: '{field} cannot have more than {max} items',
    alphanumeric: '{field} must contain only letters and numbers',
    alphanumericWithSpaces: '{field} must contain only letters, numbers, and spaces',
    futureDate: '{field} must be a future date',
    pastOrPresentDate: '{field} cannot be a future date',
    requiredTrue: '{field} must be checked',
    requiredWhen: '{field} is required',

    // Fallback
    default: '{field} is invalid',
};

/**
 * Common field names mapped to human-readable labels.
 * These can be extended or overridden by consuming applications.
 */
export const FIELD_LABELS: Record<string, string> = {
    // Authentication fields
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    username: 'Username',

    // Person/Profile fields
    firstName: 'First Name',
    lastName: 'Last Name',
    displayName: 'Display Name',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone Number',
    phoneNumber: 'Phone Number',
    mobilePhone: 'Mobile Phone',
    address: 'Address',
    street: 'Street',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    postalCode: 'Postal Code',
    country: 'Country',

    // Common form fields
    name: 'Name',
    title: 'Title',
    description: 'Description',
    url: 'URL',
    website: 'Website',
    notes: 'Notes',
    comments: 'Comments',
    message: 'Message',
    subject: 'Subject',

    // Date/Time fields
    date: 'Date',
    startDate: 'Start Date',
    endDate: 'End Date',
    time: 'Time',
    startTime: 'Start Time',
    endTime: 'End Time',
    createdAt: 'Created At',
    updatedAt: 'Updated At',

    // Numeric fields
    quantity: 'Quantity',
    amount: 'Amount',
    price: 'Price',
    total: 'Total',
    count: 'Count',
    number: 'Number',
    age: 'Age',

    // Selection fields
    category: 'Category',
    type: 'Type',
    status: 'Status',
    priority: 'Priority',
    role: 'Role',

    // File fields
    file: 'File',
    files: 'Files',
    image: 'Image',
    attachment: 'Attachment',
    document: 'Document',

    // Agreement fields
    terms: 'Terms and Conditions',
    termsAccepted: 'Terms and Conditions',
    privacyPolicy: 'Privacy Policy',
    consent: 'Consent',
};

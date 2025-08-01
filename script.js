// console.log('script.js loaded successfully');

const steps = [
    {
        message: 'Are you the property owner or an agent? 🧑‍💼',
        input: 'buttons',
        options: ['Owner', 'Agent'],
        field: 'userType',
        reminder: '⏳ Are you still there? Please choose if you’re an owner or agent.'
    },
    {
        message: '🏠 Is the property for sale or rent? 💸',
        input: 'buttons',
        options: ['Sale', 'Rent'],
        field: 'listingType',
        reminder: '⏳ Are you still there? Please select if the property is for sale or rent.'
    },
    {
        message: '📍 Which city is your property in? 🌆 (Please select from the dropdown)',
        input: 'text',
        placeholder: 'Type and select a city (e.g., Mumbai)',
        field: 'city',
        validate: (value) => {
            if (value.trim().length === 0) {
                return 'Please enter a valid city.';
            }
            if (!cityList.some(city => city.name === value)) {
                return 'Please select a city from the dropdown list.';
            }
            return '';
        },
        reminder: '⏳ Are you still there? Please select your city from the dropdown.'
    },
    {
        message: '✨ To list your property quickly and hassle-free, our expert agent is ready to assist you personally! Please share your name. 📝',
        input: 'text',
        placeholder: 'Enter your full name',
        field: 'name',
        validate: (value) => {
            if (!/^[a-zA-Z\s]{1,20}$/.test(value)) {
                return 'Please enter a valid name (only letters, max 20 characters).';
            }
            return '';
        },
        reminder: '⏳ Are you still there? Please share your name.'
    },
    {
        message: '📞 Please enter your 10-digit phone number to receive an OTP for verification. 🔒 Your data is secure.',
        input: 'text',
        placeholder: 'Enter 10-digit phone number',
        field: 'number',
        validate: (value) => /^[0-9]{10}$/.test(value) ? '' : 'Please enter a valid 10-digit phone number.',
        reminder: '⏳ Are you still there? Please enter your phone number.'
    },
    {
        message: ' Please enter the 4-digit OTP sent to your phone number.',
        input: 'otp',
        placeholder: 'Enter OTP',
        field: 'otp',
        validate: (value) => /^[0-9]{4}$/.test(value) ? '' : 'Please enter a valid 4-digit OTP.',
        reminder: ' Are you still there? Please enter the OTP.'
    }
];

// Function to create chatbot DOM elements
function createChatbotElements() {
    // Create chatbot icon
    const chatbotIcon = document.createElement('div');
    chatbotIcon.id = 'chatbot-icon';
    chatbotIcon.setAttribute('tabindex', '0');
    chatbotIcon.setAttribute('role', 'button');
    chatbotIcon.setAttribute('aria-label', 'Open chatbot');
    document.body.appendChild(chatbotIcon);

    // Create chatbot popup
    const chatbotPopup = document.createElement('div');
    chatbotPopup.className = 'chatbot-popup';
    chatbotPopup.setAttribute('tabindex', '0');
    chatbotPopup.setAttribute('role', 'button');
    chatbotPopup.setAttribute('aria-hidden', 'true');
    document.body.appendChild(chatbotPopup);

    // Create chatbot window
    const chatbotWindow = document.createElement('div');
    chatbotWindow.id = 'chatbot-window';
    document.body.appendChild(chatbotWindow);

    // Create chatbot header
    const chatbotHeader = document.createElement('div');
    chatbotHeader.className = 'chatbot-header';
    const figure = document.createElement('figure');
    const botIcon = document.createElement('img');
    botIcon.className = 'img-responsive';
    botIcon.src = 'https://property-chatbot.squareyards.com/assets/images/bot-icon-white.svg';
    botIcon.alt = 'SquareYards bot icon';
    figure.appendChild(botIcon);
    chatbotHeader.appendChild(figure);
    const companyProfile = document.createElement('div');
    companyProfile.className = 'company-profile';
    companyProfile.innerHTML = `
        <p>Property Listing Assistant</p>
        <span class="status">Online</span>
    `;
    chatbotHeader.appendChild(companyProfile);

    // Create theme toggle button
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle';
    themeToggleBtn.setAttribute('aria-label', 'Toggle theme');
    themeToggleBtn.textContent = '🌙';
    chatbotHeader.appendChild(themeToggleBtn);

    chatbotWindow.appendChild(chatbotHeader);

    // Create chatbot body
    const chatbotBodyDiv = document.createElement('div');
    chatbotBodyDiv.id = 'chatbot-body';
    chatbotBodyDiv.className = 'chatbot-body';
    chatbotWindow.appendChild(chatbotBodyDiv);

    // Create chatbot input
    const chatbotInputDiv = document.createElement('div');
    chatbotInputDiv.id = 'chatbot-input';
    chatbotInputDiv.className = 'chatbot-input';
    chatbotWindow.appendChild(chatbotInputDiv);

    // Create audio elements
    const chatSound = document.createElement('audio');
    chatSound.id = 'chatSound';
    chatSound.src = 'https://property-chatbot.squareyards.com/assets/audio/chatbot-sound.mp3';
    document.body.appendChild(chatSound);

    const errorSound = document.createElement('audio');
    errorSound.id = 'errorSound';
    errorSound.src = 'https://property-chatbot.squareyards.com/assets/audio/error.mp3';
    document.body.appendChild(errorSound);

    // Assign to global variables
    window.chatbotIcon = chatbotIcon;
    window.chatbotPopup = chatbotPopup;
    window.chatbotWindow = chatbotWindow;
    window.chatbotBodyDiv = chatbotBodyDiv;
    window.chatbotInputDiv = chatbotInputDiv;
    window.themeToggleBtn = themeToggleBtn;
}

// Inject styles (unchanged)
function injectChatbotStyles() {
    const css = `
        /* Reset and Base Styles */
        *, ::before, ::after {
            box-sizing: border-box;
            outline: none;
        }
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            background-color: #f4f4f4;
        }
        body, ul, ol, li, h1, h2, h3, h4, h5, h6, figure, p, strong {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        /* Chatbot Icon */
        #chatbot-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #333, #555);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 8px #0000004d;
            z-index: 1000;
            transition: transform 0.3s ease;
            animation: pulse 2s infinite ease-in-out;
        }
        #chatbot-icon::before {
            font-size: 24px;
            color: #fff;
        }
        #chatbot-icon.closed::before {
            content: '💬';
        }
        #chatbot-icon.open::before {
            content: 'X';
        }
        #chatbot-icon:hover {
            animation: bounce 0.4s ease;
        }
        #chatbot-icon:focus {
            outline: 2px solid #7be0b6;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 4px 8px #0000004d; }
            50% { transform: scale(1.05); box-shadow: 0 6px 12px #00000066; }
        }
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }

        /* Chatbot Popup */
        .chatbot-popup {
            position: fixed;
            bottom: 90px;
            right: 30px;
            background: linear-gradient(135deg, #7be0b6, #4a9c7a);
            color: #fff;
            padding: 10px 15px;
            border-radius: 10px;
            box-shadow: 0 3px 6px #0000004d;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            text-shadow: 0 1px 1px #00000033;
            display: none;
            z-index: 999;
            opacity: 0;
            transform: translateY(15px) scale(0.8);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .chatbot-popup.show {
            opacity: 1;
            transform: translateY(0) scale(1);
            display: block;
        }
        .chatbot-popup:not(.show) {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
        }
        .chatbot-popup::after {
            content: '';
            position: absolute;
            bottom: -6px;
            right: 10px;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #7be0b6;
        }
        .chatbot-popup:hover {
            transform: scale(1.05);
            box-shadow: 0 0 0 3px #7be0b633, 0 3px 6px #0000004d;
        }
        .chatbot-popup:focus {
            outline: 2px solid #fff;
            outline-offset: 2px;
        }
        @media (max-width: 600px) {
            .chatbot-popup {
                right: 10px;
                font-size: 11px;
                padding: 8px 12px;
            }
        }

        /* Chatbot Window */
        #chatbot-window {
            position: fixed;
            bottom: 65px;
            right: 85px;
            width: 375px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px #0003;
            display: none;
            flex-direction: column;
            z-index: 1000;
        }
        #chatbot-window.open {
            display: flex;
        }
        #chatbot-window.dark-mode {
            background: linear-gradient(145deg, #2a2a2a, #333);
            color: #fff;
        }
        @media (max-width: 600px) {
            #chatbot-window {
                width: 60%;
                height: 60%;
                bottom: 80;
                right: 0;
                border-radius: 0;
            }
        }

        /* Chatbot Header */
        .chatbot-header {
            padding: 15px;
            height: 78px;
            border-radius: 12px 12px 0 0;
            display: flex;
            gap: 10px;
            background: linear-gradient(135deg, #333, #555);
            align-items: center;
            position: relative;
        }
        .chatbot-header .company-profile {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .chatbot-header .company-profile p {
            font-size: 15px;
            color: #fff;
            line-height: 16px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
        }
        .chatbot-header .company-profile span {
            font-size: 14px;
            color: #7be0b6;
        }
        .theme-toggle {
            position: absolute;
            top: 7px;
            right: 7px;
            background: none;
            border: none;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .theme-toggle:hover {
            transform: scale(1.1);
        }
        .theme-toggle:focus {
            outline: 2px solid #7be0b6;
        }

        /* Chatbot Body */
        .chatbot-body {
            flex: 1;
            padding: 0;
            overflow-y: auto;
            background: #f7f4ff;
            max-height: 300px;
        }
        .chatbot-body.dark-mode {
            background: #222;
        }
        .chatbot-body::-webkit-scrollbar {
            width: 8px;
        }
        .chatbot-body::-webkit-scrollbar-thumb {
            background-color: #333;
            border-radius: 4px;
        }
        .chatbot-body::-webkit-scrollbar-track {
            background-color: #f1f1f1;
        }

        /* Messages */
        .message {
            margin: 10px 0;
            max-width: 80%;
            font-size: 14px;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 0.3s ease forwards;
        }
        .bot-message {
            padding: 15px 20px;
            background: #fff;
            border-radius: 0 20px 20px 20px;
            display: inline-flex;
            flex-direction: column;
            gap: 14px;
            color: #333;
        }
        .bot-message.dark-mode {
            background: #444;
            color: #fff;
        }
        .bot-message.final-message {
            font-weight: 600;
            background: #e6f0fa;
            border-left: 3px solid #7be0b6;
        }
        .bot-message.final-message.dark-mode {
            background: #444;
            border-left-color: #7be0b6;
        }
        .bot-message a {
            color: #7be0b6;
            font-weight: 600;
            text-decoration: underline;
            transition: color 0.2s ease;
        }
        .bot-message a:hover {
            color: #4a9c7a;
        }
        .bot-message a:focus {
            outline: 2px solid #7be0b6;
            outline-offset: 2px;
        }
        .bot-message a.dark-mode {
            color: #7be0b6;
        }
        .bot-message a.dark-mode:hover {
            color: #9ef2c8;
        }
        .user-message {
            background: linear-gradient(135deg, #333, #555);
            color: #fff;
            font-weight: 700;
            padding: 10px;
            border-radius: 10px 10px 0 10px;
            margin-left: auto;
        }
        .selected-option {
            background: linear-gradient(135deg, #333, #555);
            font-weight: 700;
            border: 1px solid #333;
            padding: 8px 12px;
        }
        .reminder-message {
            background-color: #fff3cd;
            color: #856404;
            padding: 15px 20px;
            font-style: italic;
            border-radius: 0 20px 20px 20px;
        }
        .reminder-message.dark-mode {
            background: #4b3b1b;
            color: #ffeb3b;
        }

        /* Typing Indicator */
        .typing-indicator {
            padding: 12px;
            border-radius: 0 20px 20px 20px;
            background: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: pulseTyping 1.8s infinite ease-in-out;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .typing-indicator.dark-mode {
            background: #444;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .typing-indicator.bouncing-dots .dot {
            width: 10px;
            height: 10px;
            background: #7be0b6;
            border-radius: 50%;
            animation: dotPulse 1.4s infinite ease-in-out;
        }
        .typing-indicator.bouncing-dots.dark-mode .dot {
            background: #7be0b6;
        }
        .typing-indicator.bouncing-dots .dot:nth-child(1) {
            animation-delay: 0s;
        }
        .typing-indicator.bouncing-dots .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-indicator.bouncing-dots .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(1) translateY(0); opacity: 0.6; }
            40% { transform: scale(1.6) translateY(-2px); opacity: 1; box-shadow: 0 0 8px rgba(123,224,182,0.5); }
        }
        @keyframes pulseTyping {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
            .message { font-size: 12px; }
            .typing-indicator { padding: 8px; gap: 6px; }
            .typing-indicator .dot { width: 8px; height: 8px; }
        }

        /* Chatbot Input */
        .chatbot-input {
            padding: 10px 20px;
            border-top: 1px solid #ddd;
            background: #fff;
            border-radius: 0 0 12px 12px;
        }
        .chatbot-input.dark-mode {
            background: #2a2a2a;
            border-top-color: #444;
        }
        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        .input-wrapper input {
            width: 100%;
            padding: 8px 40px 8px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.2s ease;
        }
        .input-wrapper input:focus {
            outline: none;
            border-color: #7be0b6;
        }
        .input-wrapper input:focus + .submit-arrow {
            background: #7be0b6;
            color: #fff;
        }
        .input-wrapper input:valid:not(:placeholder-shown) {
            border-color: #2e7d32;
        }
        .input-wrapper input:invalid:not(:placeholder-shown) {
            border-color: #d32f2f;
        }
        .input-wrapper input.dark-mode {
            background: #333;
            color: #fff;
            border-color: #555;
        }
        .input-wrapper .submit-arrow {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: #333;
            font-size: 18px;
            cursor: pointer;
            background: #f0f0f0;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .input-wrapper .submit-arrow:hover {
            background: #e0e0e0;
            transform: scale(1.1) translateY(-50%);
        }
        .input-wrapper input:focus::after {
            content: 'Press Enter';
            position: absolute;
            bottom: 2px;
            right: 45px;
            font-size: 10px;
            color: #7be0b6;
            font-style: italic;
        }
        @media (max-width: 600px) {
            .input-wrapper input {
                font-size: 12px;
            }
            .input-wrapper input:focus::after {
                font-size: 9px;
            }
        }

        /* OTP Input */
        .otp-container {
            display: flex;
            gap: 7px;
            justify-content: center;
            margin-bottom: 1px;
        }
        .otp-input {
            width: 35px;
            height: 35px;
            text-align: center;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .error-message {
            color: #d32f2f;
            font-size: 11px;
            margin-top: 5px;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        .otp-input:focus {
            outline: none;
            border-color: #7be0b6;
            box-shadow: 0 0 5px rgba(123,224,255,0.5);
        }
        .otp-input:valid {
            border-color: #2e7d32;
        }
        .otp-input:invalid:not(:placeholder-shown) {
            border-color: #d32f2f;
        }
        .otp-input.dark-mode {
            background: #333;
            color: #fff;
            border-color: #555;
        }
        .otp-resend {
            display: flex;
            flex-direction: row;
            gap: 10px;
            align-items: center;
            justify-content: center;
            margin-top: 8px;
        }
        .otp-resend button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            background: #ccc;
            color: #fff;
            cursor: not-allowed;
            font-size: 13px;
            transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
        }
        .otp-resend button.enabled {
            background: linear-gradient(135deg, #7be0b6, #4a9c7a);
            cursor: pointer;
        }
        .otp-resend button.enabled:hover {
            transform: scale(1.05);
        }
        .otp-resend button:focus {
            outline: 1px solid #7be0b6;
        }
        .otp-resend button.secondary {
            background: linear-gradient(135deg, #555, #777);
            cursor: pointer;
        }
        .otp-resend button.secondary:hover {
            transform: scale(1.05);
        }
        .otp-timer {
            font-size: 12px;
            color: #333;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
        }
        .otp-timer.dark-mode {
            color: #fff;
        }
        @media (max-width: 600px) {
            .otp-resend button {
                padding: 6px 12px;
                font-size: 12px;
            }
        }

        /* Autocomplete Dropdown */
        .autocomplete-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 150px;
            overflow-y: auto;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px #0000001a;
            z-index: 1001;
            display: none;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.2s ease;
        }
        .autocomplete-dropdown.active {
            transform: scaleY(1);
            display: block;
        }
        .autocomplete-dropdown.dark-mode {
            background: #333;
            border-color: #555;
        }
        .autocomplete-dropdown .autocomplete-item {
            padding: 8px 10px;
            cursor: pointer;
            font-size: 14px;
            color: #333;
            transition: background-color 0.2s ease;
        }
        .autocomplete-dropdown .autocomplete-item:hover,
        .autocomplete-item.active {
            background: #e6f0fa;
        }
        .autocomplete-dropdown.dark-mode .autocomplete-item {
            color: #fff;
        }
        .autocomplete-dropdown.dark-mode .autocomplete-item:hover,
        .autocomplete-dropdown.dark-mode .autocomplete-item.active {
            background: #444;
        }
        .autocomplete-dropdown::-webkit-scrollbar {
            width: 6px;
        }
        .autocomplete-dropdown::-webkit-scrollbar-thumb {
            background-color: #333;
            border-radius: 3px;
        }
        .autocomplete-dropdown::-webkit-scrollbar-track {
            background-color: #f1f1f1;
        }

        /* Chatbot Buttons */
        .chatbot-input .buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .chatbot-input button {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: linear-gradient(135deg, #333, #555);
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            transition: transform 0.2s ease;
        }
        .chatbot-input .default {
            background: #fff;
            color: #333;
            border-width: 1px;
            border-style: solid;
            border-color: #333;
        }
        .chatbot-input button:hover {
            transform: scale(1.05);
        }
        .chatbot-input button:focus {
            outline: 2px solid #7be0b6;
        }
        .chatbot-input button.secondary {
            background: linear-gradient(135deg, #555, #777);
            color: #fff;
        }
        .chatbot-input .clear-chat-btn {
            display: block;
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #ff4d4d;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: transform 0.2s ease;
        }
        .chatbot-input .clear-chat-btn:hover {
            transform: scale(1.05);
        }
        .chatbot-input .clear-chat-btn:focus {
            outline: 2px solid #7be0b6;
        }
        @media (max-width: 600px) {
            .chatbot-input button {
                font-size: 12px;
            }
            .chatbot-input .clear-chat-btn {
                font-size: 12px;
            }
        }

        /* Final Message Container */
        .final-message-container {
            display: flex;
            align-items: center;
            background: #f0f8ff;
            border: 1px solid #b3e5fc;
            border-radius: 8px;
            padding: 10px;
            margin-top: 10px;
            font-size: 14px;
            color: #333;
        }
        .final-message-container.dark-mode {
            background: #2e5f5e;
            border-color: #4b6f7d;
            color: #fff;
        }
        @media (max-width: 600px) {
            .final-message-container {
                font-size: 12px;
            }
        }
        .final-message-container img.agent-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        /* Online Status */
        .online-status {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #2e7d32;
            margin-bottom: 5px;
        }
        .online-status.dark-mode {
            color: #7be0b6;
        }
        @media (max-width: 600px) {
            .online-status {
                font-size: 10px;
            }
        }
        .online-dot {
            width: 10px;
            height: 10px;
            background-color: #2e7d32;
            border-radius: 50%;
            margin-right: 10px;
        }
        .online-dot.dark-mode {
            background-color: #7be0b6;
        }

        
    `;
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
}

// State Management
const state = {
    step: 0,
    data: {
        userType: '',
        listingType: '',
        city: '',
        cityId: '',
        name: '',
        number: '',
        otp: '',
        user_id: ''
    },
    hasStarted: false,
    reminderTimeout: null,
    reminderShown: false,
    isOtpSent: false,
    otpAttempts: 0,
    maxOtpAttempts: 3,
    otpSentTime: null,
    otpValidDuration: 300000,
    resendCooldown: 30000,
    lastOtpSent: null,
    timerInterval: null,
    isLeadSubmitted: false,
    bypassOtp: false
};

let cityList = [];
let cityListFetched = false;
let popupInterval = null;
let currentAnimationStyle = 'bouncing-dots';
const animationStyles = ['bouncing-dots', 'horizontal-wave', 'rotating-squares'];
const popupMessages = [
    "List Your Property Fast!",
    "Sell or Rent in Minutes!",
    "Get Started with SquareYards!",
    "Post Your Listing Now!",
    "Find Buyers or Tenants Today!"
];

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showPopupMessage() {
    if (!window.chatbotIcon.classList.contains('closed')) {
        window.chatbotPopup.classList.remove('show');
        window.chatbotPopup.setAttribute('aria-hidden', 'true');
        return;
    }
    const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    window.chatbotPopup.textContent = randomMessage;
    window.chatbotPopup.setAttribute('aria-label', randomMessage);
    window.chatbotPopup.setAttribute('aria-hidden', 'false');
    window.chatbotPopup.classList.add('show');
    setTimeout(() => {
        window.chatbotPopup.classList.remove('show');
        window.chatbotPopup.setAttribute('aria-hidden', 'true');
    }, 6000);
}

function startPopupInterval() {
    showPopupMessage();
    popupInterval = setInterval(showPopupMessage, 12000);
}

function stopPopupInterval() {
    clearInterval(popupInterval);
    window.chatbotPopup.classList.remove('show');
    window.chatbotPopup.setAttribute('aria-hidden', 'true');
}

// API Functions
async function fetchCityList() {
    // if (!window.CITY_API_KEY) {
    //     console.error('CITY_API_KEY not loaded');
    //     addBotMessage('Error: API key not available. Please try again later.');
    //     return;
    // }
    try {
        const response = await fetch('https://beats.squareyards.com/api/SecondaryPortal/getCityList', {
            method: 'POST',
            headers: {
                'api_key': "uAqGJ6bvNqcqsxh4TXMRHP596adeEMLVomMZywp1U0VHUeHLwHxv5jbe5Aw8",
                'Content-Type': 'application/json',
                // 'Origin': 'http://127.0.0.1:5501'
            },
            body: JSON.stringify({
                fromSource: 'whatsapp',
                countryId: 1,
                userType: 'CP'
            })
        });
        const data = await response.json();
        if (data.status === 1 && data.mastercities && Array.isArray(data.mastercities)) {
            cityList = data.mastercities.map(city => ({
                name: city.cityName,
                id: city.cityid.toString()
            })).sort((a, b) => a.name.localeCompare(b.name));
        } else {
            console.error('Failed to fetch city list:', data);
            addBotMessage('Error loading cities. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching city list:', error);
        addBotMessage('Error loading cities. Please try again.');
    }
    cityListFetched = true;
}

async function sendOtp(number) {
    try {
        const response = await fetch('https://syai-property-chatbot.squareyards.com/api/otp/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                countryCode: "91",
                mobile: number
            })
        });
        const result = await response.json();
        if (response.status === 200 && result.message === 'OTP sent Successfully on mobile') {
            state.otpSentTime = Date.now();
            state.lastOtpSent = Date.now();
            state.otpAttempts = 0;
            state.isOtpSent = true;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
}

async function verifyOtp(number, otp) {
    if (state.bypassOtp) return true;
    try {
        const response = await fetch('https://syai-property-chatbot.squareyards.com/api/otp/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                countryCode: "91",
                mobile: number,
                otp: otp
            })
        });
        const result = await response.json();
        if (response.status === 200 && result.data && result.data.userExists) {
            return true;
        } else if (response.status === 400 && result.message === 'Invalid OTP') {
            return false;
        } else {
            throw new Error(result.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

async function sendChatMessage(message) {
    try {
        const response = await fetch('https://syai-property-chatbot.squareyards.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-User-Phone': state.data.user_id || 'anonymous'
            },
            body: JSON.stringify({
                message: message,
                city: state.data.city,
                user_id: state.data.user_id || 'anonymous'
            })
        });
        const result = await response.json();
        if (response.status === 200 && result.status === 'success') {
            return result.response;
        } else {
            throw new Error(result.detail || 'Failed to get response from chatbot.');
        }
    } catch (error) {
        console.error('Error sending chat message:', error);
        return 'Sorry, something went wrong. Please try again.';
    }
}

function startOtpTimer(resendButton, timerSpan) {
    let timeLeft = 30;
    timerSpan.textContent = `(Wait ${timeLeft}s)`;
    resendButton.disabled = true;
    resendButton.classList.remove('enabled');

    state.timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = `(Wait ${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(state.timerInterval);
            resendButton.disabled = false;
            resendButton.classList.add('enabled');
            timerSpan.textContent = '';
        }
    }, 1000);
}

function toggleChatbot() {
    const isWindowOpen = window.chatbotWindow.classList.contains('open');
    if (isWindowOpen) {
        window.chatbotWindow.style.display = 'none';
        window.chatbotWindow.classList.remove('open');
        clearReminderTimeout();
        clearInterval(state.timerInterval);
        window.chatbotIcon.classList.remove('open');
        window.chatbotIcon.classList.add('closed');
        startPopupInterval();
    } else {
        window.chatbotWindow.style.display = 'flex';
        window.chatbotWindow.classList.add('open');
        if (!state.hasStarted) {
            startChat();
            state.hasStarted = true;
        }
        window.chatbotIcon.classList.remove('closed');
        window.chatbotIcon.classList.add('open');
        stopPopupInterval();
        window.chatbotInputDiv.querySelector('input, button')?.focus();
    }
}

async function startChat() {
    addBotMessage('👋 Hi! Let’s list your property on SquareYards. 🚀');
    showStep(0);
    if (!cityListFetched) {
        try {
            await fetchCityList();
        } catch (error) {
            console.warn('City list fetch failed, proceeding without it:', error);
            addBotMessage('City list unavailable. Please proceed with manual input if needed.');
        }
    }
}

function showStep(stepIndex) {
    state.step = stepIndex;
    state.reminderTimeout = null;
    state.reminderShown = false;
    const step = steps[stepIndex];
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        addBotMessage(step.message);
        setTimeout(() => {
            window.chatbotInputDiv.innerHTML = '';
            clearReminderTimeout();
            if (stepIndex !== 5) {
                state.reminderTimeout = setTimeout(() => {
                    if (!state.reminderShown) {
                        addBotMessage(step.reminder, 'reminder-message');
                        state.reminderShown = true;
                    }
                }, 20000);
            }

            if (step.input === 'buttons') {
                const buttonsDiv = document.createElement('div');
                buttonsDiv.className = 'buttons';
                step.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.setAttribute('aria-label', `Select ${option}`);
                    button.addEventListener('click', () => handleButtonClick(option, step.field));
                    button.className = index === 0 ? 'default' : 'secondary';
                    buttonsDiv.appendChild(button);
                });
                window.chatbotInputDiv.appendChild(buttonsDiv);
                buttonsDiv.querySelector('button')?.focus();
            } else if (step.input === 'text') {
                const inputWrapper = document.createElement('div');
                inputWrapper.className = 'input-wrapper';

                const input = document.createElement('input');
                input.type = step.field === 'number' ? 'tel' : 'text';
                input.placeholder = step.placeholder;
                input.setAttribute('aria-label', step.placeholder);
                input.classList.toggle('dark-mode', window.chatbotWindow.classList.contains('dark-mode'));
                if (step.field === 'number') {
                    input.pattern = '[0-9]{10}';
                    input.maxLength = 10;
                } else if (step.field === 'name') {
                    input.maxLength = 20;
                    input.addEventListener('input', () => {
                        input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
                    });
                }

                const submitArrow = document.createElement('span');
                submitArrow.className = 'submit-arrow';
                submitArrow.innerHTML = '➔';
                submitArrow.setAttribute('aria-label', 'Submit input');

                inputWrapper.appendChild(input);
                inputWrapper.appendChild(submitArrow);

                window.chatbotInputDiv.appendChild(inputWrapper);

                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                window.chatbotInputDiv.appendChild(errorDiv);

                if (step.field === 'city') {
                    const dropdown = document.createElement('div');
                    dropdown.className = 'autocomplete-dropdown';
                    inputWrapper.appendChild(dropdown);

                    let activeIndex = -1;

                    const debouncedAutocomplete = debounce((value, dropdown) => {
                        dropdown.innerHTML = '';
                        activeIndex = -1;

                        if (value.trim().length === 0) {
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                            return;
                        }

                        const filteredCities = cityList.filter(city =>
                            city.name.toLowerCase().startsWith(value.toLowerCase())
                        );

                        if (filteredCities.length > 0) {
                            filteredCities.slice(0, 5).forEach((city, index) => {
                                const item = document.createElement('div');
                                item.className = 'autocomplete-item';
                                item.textContent = city.name;
                                item.setAttribute('tabindex', '0');
                                item.setAttribute('role', 'option');
                                item.addEventListener('click', () => {
                                    input.value = city.name;
                                    state.data.cityId = city.id;
                                    dropdown.innerHTML = '';
                                    dropdown.style.display = 'none';
                                    dropdown.classList.remove('active');
                                    handleTextInput(city.name, step.field, step.validate, errorDiv);
                                });
                                item.addEventListener('keydown', (e) => {
                                    if (e.key === 'Enter') {
                                        input.value = city.name;
                                        state.data.cityId = city.id;
                                        dropdown.innerHTML = '';
                                        dropdown.style.display = 'none';
                                        dropdown.classList.remove('active');
                                        handleTextInput(city.name, step.field, step.validate, errorDiv);
                                    }
                                });
                                dropdown.appendChild(item);
                            });
                            dropdown.style.display = 'block';
                            dropdown.classList.add('active');
                        } else {
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                        }
                    }, 300);

                    input.addEventListener('input', (e) => {
                        debouncedAutocomplete(e.target.value, dropdown);
                        if (step.validate) {
                            errorDiv.textContent = step.validate(e.target.value);
                        }
                    });

                    input.addEventListener('keydown', (e) => {
                        const items = dropdown.querySelectorAll('.autocomplete-item');
                        if (items.length === 0) return;

                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            activeIndex = (activeIndex + 1) % items.length;
                            updateActiveItem(activeIndex, items);
                            items[activeIndex].focus();
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            activeIndex = (activeIndex - 1 + items.length) % items.length;
                            updateActiveItem(activeIndex, items);
                            items[activeIndex].focus();
                        } else if (e.key === 'Enter' && activeIndex >= 0) {
                            e.preventDefault();
                            const selectedCity = filteredCities[activeIndex];
                            input.value = selectedCity.name;
                            state.data.cityId = selectedCity.id;
                            dropdown.innerHTML = '';
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                            handleTextInput(selectedCity.name, step.field, step.validate, errorDiv);
                        } else if (e.key === 'Enter') {
                            e.preventDefault();
                            const selectedCity = cityList.find(city => city.name === input.value);
                            if (selectedCity) {
                                state.data.cityId = selectedCity.id;
                                dropdown.innerHTML = '';
                                dropdown.style.display = 'none';
                                dropdown.classList.remove('active');
                                handleTextInput(input.value, step.field, step.validate, errorDiv);
                            } else {
                                errorDiv.textContent = 'Please select a city from the dropdown list.';
                            }
                        } else if (e.key === 'Escape') {
                            dropdown.innerHTML = '';
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                        }
                    });

                    submitArrow.addEventListener('click', () => {
                        const selectedCity = cityList.find(city => city.name === input.value);
                        if (selectedCity) {
                            state.data.cityId = selectedCity.id;
                            dropdown.innerHTML = '';
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                            handleTextInput(input.value, step.field, step.validate, errorDiv);
                        } else {
                            errorDiv.textContent = 'Please select a city from the dropdown list.';
                        }
                    });

                    document.addEventListener('click', (e) => {
                        if (!inputWrapper.contains(e.target)) {
                            dropdown.innerHTML = '';
                            dropdown.style.display = 'none';
                            dropdown.classList.remove('active');
                        }
                    });

                    function updateActiveItem(index, items) {
                        items.forEach(item => item.classList.remove('active'));
                        items[index].classList.add('active');
                        items[index].scrollIntoView({ block: 'nearest' });
                    }
                } else {
                    input.addEventListener('input', () => {
                        if (step.validate) {
                            errorDiv.textContent = step.validate(input.value);
                        }
                    });
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            handleTextInput(input.value, step.field, step.validate, errorDiv);
                        }
                    });
                    submitArrow.addEventListener('click', () => {
                        handleTextInput(input.value, step.field, step.validate, errorDiv);
                    });
                }

                input.focus();
            } else if (step.input === 'otp') {
                const otpContainer = document.createElement('div');
                otpContainer.className = 'otp-container';

                const inputs = [];
                for (let i = 0; i < 4; i++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'otp-input';
                    input.maxLength = 1;
                    input.pattern = '[0-9]';
                    input.inputMode = 'numeric';
                    input.setAttribute('aria-label', `OTP digit ${i + 1}`);
                    input.classList.toggle('dark-mode', window.chatbotWindow.classList.contains('dark-mode'));
                    input.addEventListener('input', (e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        if (e.target.value.length === 1 && i < 3) {
                            inputs[i + 1].focus();
                        }
                        const otp = inputs.map(inp => inp.value).join('');
                        if (otp.length === 4) {
                            clearInterval(state.timerInterval);
                            timerSpan.textContent = '';
                            handleTextInput(otp, step.field, step.validate, errorDiv);
                        }
                    });
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace' && input.value === '' && i > 0) {
                            inputs[i - 1].focus();
                        }
                    });
                    otpContainer.appendChild(input);
                    inputs.push(input);
                }

                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                window.chatbotInputDiv.appendChild(otpContainer);
                window.chatbotInputDiv.appendChild(errorDiv);

                const resendDiv = document.createElement('div');
                resendDiv.className = 'otp-resend';
                const resendButton = document.createElement('button');
                resendButton.textContent = 'Resend OTP';
                const timerSpan = document.createElement('span');
                timerSpan.className = 'otp-timer';
                timerSpan.classList.toggle('dark-mode', window.chatbotWindow.classList.contains('dark-mode'));
                resendDiv.appendChild(timerSpan);
                resendDiv.appendChild(resendButton);

                const editNumberButton = document.createElement('button');
                editNumberButton.textContent = 'Edit Number';
                editNumberButton.setAttribute('aria-label', 'Edit phone number');
                editNumberButton.className = 'secondary';
                editNumberButton.addEventListener('click', () => {
                    const chatSound = document.getElementById('chatSound');
                    if (chatSound) {
                        chatSound.currentTime = 0;
                        chatSound.play().catch(error => console.error('Chat sound error:', error));
                    }
                    state.data.number = '';
                    state.data.otp = '';
                    state.isOtpSent = false;
                    state.otpAttempts = 0;
                    state.otpSentTime = null;
                    state.lastOtpSent = null;
                    clearInterval(state.timerInterval);
                    clearReminderTimeout();
                    addBotMessage('Please enter your correct phone number.');
                    showStep(4);
                });
                resendDiv.appendChild(editNumberButton);

                window.chatbotInputDiv.appendChild(resendDiv);

                startOtpTimer(resendButton, timerSpan);

                resendButton.addEventListener('click', async () => {
                    if (resendButton.disabled) {
                        errorDiv.textContent = 'Please wait before resending OTP.';
                        return;
                    }
                    showTypingIndicator();
                    const success = await sendOtp(state.data.number);
                    removeTypingIndicator();
                    if (success) {
                        addBotMessage('OTP resent successfully.');
                        startOtpTimer(resendButton, timerSpan);
                    } else {
                        errorDiv.textContent = 'Failed to resend OTP. Please try again.';
                    }
                });

                inputs[0].focus();
            }
        }, 300);
    }, 800);
}

function clearReminderTimeout() {
    if (state.reminderTimeout) {
        clearTimeout(state.reminderTimeout);
        state.reminderTimeout = null;
    }
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = `message typing-indicator ${currentAnimationStyle}`;
    indicator.setAttribute('aria-hidden', 'true');
    indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    if (window.chatbotWindow.classList.contains('dark-mode')) {
        indicator.classList.add('dark-mode');
    }
    window.chatbotBodyDiv.appendChild(indicator);
    window.chatbotBodyDiv.scrollTop = window.chatbotBodyDiv.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = window.chatbotBodyDiv.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function addBotMessage(htmlContent, className = 'bot-message', timeout = 0) {
    const message = document.createElement('div');
    message.className = `message ${className}`;
    if (window.chatbotWindow.classList.contains('dark-mode')) {
        message.classList.add('dark-mode');
    }
    message.innerHTML = htmlContent;
    window.chatbotBodyDiv.appendChild(message);

    if (timeout > 0) {
        setTimeout(() => message.remove(), timeout);
    }

    const isScrolledToBottom = window.chatbotBodyDiv.scrollHeight - window.chatbotBodyDiv.scrollTop - window.chatbotBodyDiv.clientHeight < 600;
    if (isScrolledToBottom) {
        window.chatbotBodyDiv.scrollTo({
            top: window.chatbotBodyDiv.scrollHeight,
            behavior: 'smooth'
        });
    }
}

function addUserMessage(text, isSelectedOption = false) {
    const message = document.createElement('div');
    message.className = 'message user-message';
    if (isSelectedOption) {
        message.classList.add('selected-option');
    }
    message.textContent = text;
    window.chatbotBodyDiv.appendChild(message);

    const isScrolledToBottom = window.chatbotBodyDiv.scrollHeight - window.chatbotBodyDiv.scrollTop - window.chatbotBodyDiv.clientHeight < 600;
    if (isScrolledToBottom) {
        window.chatbotBodyDiv.scrollTo({
            top: window.chatbotBodyDiv.scrollHeight,
            behavior: 'smooth'
        });
    }
}

async function handleButtonClick(value, field) {
    clearReminderTimeout();
    state.data[field] = value;
    addUserMessage(value, true);
    const chatSound = document.getElementById('chatSound');
    if (chatSound) {
        chatSound.currentTime = 0;
        chatSound.play().catch(error => console.error('Chat sound error:', error));
    }
    proceedToNextStep();
}

async function handleTextInput(value, field, validate, errorDiv) {
    const error = validate ? validate(value) : '';
    if (error) {
        errorDiv.textContent = error;
        const errorSound = document.getElementById('errorSound');
        if (errorSound) {
            errorSound.currentTime = 0;
            errorSound.play().catch(error => console.error('Error sound error:', error));
        }
        return;
    }
    clearReminderTimeout();
    state.data[field] = value;

    if (field === 'otp' && !state.bypassOtp) {
        const errorSound = document.getElementById('errorSound');
        if (state.otpAttempts >= state.maxOtpAttempts) {
            errorDiv.textContent = 'Maximum OTP attempts reached. Please resend OTP.';
            if (errorSound) {
                errorSound.currentTime = 0;
                errorSound.play().catch(error => console.error('Error sound playback failed:', error));
            }
            return;
        }
        if (Date.now() - state.otpSentTime > state.otpValidDuration) {
            errorDiv.textContent = 'OTP has expired. Please resend OTP.';
            if (errorSound) {
                errorSound.currentTime = 0;
                errorSound.play().catch(error => console.error('Error sound playback failed:', error));
            }
            return;
        }
        const error = validate ? validate(value) : '';
        if (error) {
            errorDiv.textContent = error;
            if (errorSound) {
                errorSound.currentTime = 0;
                errorSound.play().catch(error => console.error('Error sound playback failed:', error));
            }
            return;
        }
        state.otpAttempts++;
        showTypingIndicator();
        const success = await verifyOtp(state.data.number, value);
        removeTypingIndicator();
        if (!success) {
            errorDiv.textContent = `Invalid OTP. ${state.maxOtpAttempts - state.otpAttempts} attempts remaining.`;
            if (errorSound) {
                errorSound.currentTime = 0;
                errorSound.play().catch(error => console.error('Error sound playback failed:', error));
            }
            return;
        }
        addUserMessage('****');
    } else if (field === 'otp' && state.bypassOtp) {
        // addUserMessage('****');
    } else {
        addUserMessage(value);
    }

    if (field === 'number' && !state.bypassOtp) {
        showTypingIndicator();
        const success = await sendOtp(value);
        removeTypingIndicator();
        if (!success) {
            errorDiv.textContent = 'Failed to send OTP. Please try again.';
            return;
        }
        addBotMessage('OTP sent successfully to your phone number.');
        state.isOtpSent = true;
    } else if (field === 'number' && state.bypassOtp) {
        state.isOtpSent = true;
        state.data.user_id = value;
    }

    if (field === 'number') {
        state.data.user_id = value;
    }

    if (field === 'name' || field === 'number' || field === 'city') {
        const chatSound = document.getElementById('chatSound');
        if (chatSound) {
            chatSound.currentTime = 0;
            chatSound.play().catch(error => console.error('Chat sound error:', error));
        }
    }

    proceedToNextStep();
}

function proceedToNextStep() {
    if (state.step < steps.length - 1) {
        if (state.bypassOtp && state.step === 4) {
            state.data.otp = '1234';
            state.isOtpSent = true;
            state.otpAttempts = 0;
            clearReminderTimeout();
            clearInterval(state.timerInterval);
            addUserMessage('****');
            submitToBackend();
        } else {
            setTimeout(() => showStep(state.step + 1), 500);
        }
    } else {
        clearReminderTimeout();
        clearInterval(state.timerInterval);
        submitToBackend();
    }
}

function showFinalButtons() {
    window.chatbotInputDiv.innerHTML = '';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const startNewBtn = document.createElement('button');
    startNewBtn.textContent = 'Start New Listing';
    startNewBtn.className = 'default';
    startNewBtn.setAttribute('aria-label', 'Start new listing');
    startNewBtn.addEventListener('click', clearChat);
    buttonsDiv.appendChild(startNewBtn);

    window.chatbotInputDiv.appendChild(buttonsDiv);
    buttonsDiv.querySelector('button')?.focus();
}

function showChatInput() {
    window.chatbotInputDiv.innerHTML = '';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Ask about properties...';
    input.setAttribute('aria-label', 'Ask about properties');
    input.classList.toggle('dark-mode', window.chatbotWindow.classList.contains('dark-mode'));

    const submitArrow = document.createElement('span');
    submitArrow.className = 'submit-arrow';
    submitArrow.innerHTML = '➔';
    submitArrow.setAttribute('aria-label', 'Send message');

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(submitArrow);

    window.chatbotInputDiv.appendChild(inputWrapper);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    window.chatbotInputDiv.appendChild(errorDiv);

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            const message = input.value.trim();
            addUserMessage(message);
            input.value = '';
            showTypingIndicator();
            const response = await sendChatMessage(message);
            removeTypingIndicator();
            addBotMessage(response);
        }
    });

    submitArrow.addEventListener('click', async () => {
        if (input.value.trim()) {
            const message = input.value.trim();
            addUserMessage(message);
            input.value = '';
            showTypingIndicator();
            const response = await sendChatMessage(message);
            removeTypingIndicator();
            addBotMessage(response);
        }
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const startNewBtn = document.createElement('button');
    startNewBtn.textContent = 'Start New Listing';
    startNewBtn.className = 'default';
    startNewBtn.setAttribute('aria-label', 'Start new listing');
    startNewBtn.addEventListener('click', clearChat);
    buttonsDiv.appendChild(startNewBtn);

    window.chatbotInputDiv.appendChild(buttonsDiv);

    input.focus();
}

async function submitToBackend() {
    // if (!window.SUBMIT_API_KEY) {
    //     console.error('SUBMIT_API_KEY not loaded');
    //     addBotMessage('Error: API key not available. Please try again later.');
    //     return;
    // }
    try {
        const payload = {
            customerName: state.data.name,
            customerEmail: "",
            customerPhoneNumber: `91-${state.data.number}`,
            source: "WhatsAppChat",
            countryId: 1,
            requirementType: 0,
            listingType: state.data.listingType === "Sale" ? "1" : "2",
            cityId: state.data.cityId,
            userType: state.data.userType.toUpperCase()
        };

        if (!state.data.cityId || !cityList.some(city => city.id === state.data.cityId)) {
            console.error('Invalid cityId:', state.data.cityId);
            addBotMessage('Error: Invalid city selected. Please choose a valid city.');
            showRestartButton();
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'api_key': "uAqGJ6bvNqcqsxh4TXMRHP596adeEMLVomMZywp1U0VHUeHLwHxv5jbe5Aw8="
        };

        const response = await fetch('https://beatsdemo.squareyards.com/api/SecondaryPortal/ownerRegistration', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
            mode: 'cors',
            credentials: 'omit'
        });

        let result;
        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                result = await response.text();
            }
        } catch (jsonError) {
            console.error('JSON Parse Error:', jsonError.message);
            result = await response.text();
        }

        if (response.status === 200 && typeof result === 'object' && result.status === 1) {
            state.isLeadSubmitted = true;
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addBotMessage(`Thank you, ${state.data.name}! Your phone number has been verified. Our agent will contact you soon to list your property in ${state.data.city}. 🙌`);
                addBotMessage(`
                    <div class="online-status">
                        <span class="online-dot"></span>
                        <span>Agent Online</span>
                    </div>
                    <div class="final-message-container">
                        <img src="https://property-chatbot.squareyards.com/assets/images/bot-icon-white.svg" alt="Agent" class="agent-image">
                        <div class="final-message-text">
                            📞 Our expert will call you soon to list your property in ${state.data.city} 🏠 – get started with SquareYards today! 🚀
                        </div>
                    </div>
                `);
                addBotMessage('Feel free to ask any questions about properties or real estate 🏠 in your city!');
                setTimeout(() => {
                    showChatInput();
                    window.chatbotInputDiv.querySelector('input')?.focus();
                }, 300);
            }, 800);
        } else if (response.status === 403) {
            console.error('Forbidden error:', result);
            let errorMessage = '';
            if (typeof result === 'object' && result.message) {
                errorMessage += ` ${result.message}`;
            } else if (result.includes('duplicate')) {
                errorMessage += ' Phone number already registered. Please use a different number.';
            } else {
                errorMessage += ' Please try a different phone number or contact support.';
            }
            addBotMessage(errorMessage);
            showRestartButton();
        } else if (response.status === 401) {
            console.error('Unauthorized error:', result);
            addBotMessage('Error: Invalid API key. Please contact support.');
            showRestartButton();
        } else {
            console.error('Submission failed:', { status: response.status, result });
            addBotMessage(`Error: Failed to save data (Status: ${response.status}). ${typeof result === 'string' ? result : result.message || 'Please try again.'}`);
            showRestartButton();
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
        let errorMessage = 'Error: Unable to connect to the server.';
        if (error.message.includes('CORS')) {
            errorMessage += ' CORS issue detected. Please contact support.';
        } else {
            errorMessage += ` ${error.message || 'Please try again later.'}`;
        }
        addBotMessage(errorMessage);
        showRestartButton();
    }
}

function showRestartButton() {
    window.chatbotInputDiv.innerHTML = '';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart Listing';
    restartBtn.className = 'default';
    restartBtn.setAttribute('aria-label', 'Restart listing');
    restartBtn.addEventListener('click', clearChat);
    buttonsDiv.appendChild(restartBtn);
    window.chatbotInputDiv.appendChild(buttonsDiv);
    restartBtn.focus();
}

function clearChat() {
    state.step = 0;
    state.data = {
        userType: '',
        listingType: '',
        city: '',
        cityId: '',
        name: '',
        number: '',
        otp: '',
        user_id: ''
    };
    state.hasStarted = false;
    state.reminderTimeout = null;
    state.reminderShown = false;
    state.isOtpSent = false;
    state.otpAttempts = 0;
    state.otpSentTime = null;
    state.lastOtpSent = null;
    state.isLeadSubmitted = false;
    clearReminderTimeout();
    clearInterval(state.timerInterval);
    window.chatbotBodyDiv.innerHTML = '';
    window.chatbotInputDiv.innerHTML = '';
    startChat();
}

// async function loadConfig() {
//     try {
//         const response = await fetch('/config');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const config = await response.json();
//         window.CITY_API_KEY = config.CITY_API_KEY;
//         window.SUBMIT_API_KEY = config.SUBMIT_API_KEY;
//     } catch (error) {
//         console.error('Failed to load API keys:', error);
//         addBotMessage('Error loading configuration. Please ensure the server is running and try again later.');
//         setTimeout(loadConfig, 5000);
//     }
// }

function initializePropertyListingChatbot() {
    // Ensure chatbot starts closed
    window.chatbotWindow.style.display = 'none';
    window.chatbotWindow.classList.remove('open');
    window.chatbotIcon.classList.add('closed');
    window.chatbotIcon.classList.remove('open');
    startPopupInterval();


    // Theme toggle event listener
    window.themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = window.chatbotWindow.classList.toggle('dark-mode');
        window.chatbotBodyDiv.classList.toggle('dark-mode');
        window.chatbotInputDiv.classList.toggle('dark-mode');
        window.themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
        document.querySelectorAll('.bot-message, .typing-indicator, .reminder-message, .final-message-container, .online-status, .online-dot, .input-wrapper input, .otp-input, .otp-timer').forEach(item => {
            item.classList.toggle('dark-mode', isDarkMode);
        });
    });

    window.chatbotIcon.addEventListener('click', toggleChatbot);
    window.chatbotIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChatbot();
        }
    });
    window.chatbotPopup.addEventListener('click', toggleChatbot);
    window.chatbotPopup.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChatbot();
        }
    });

    // // Event listeners for elements with class open-post-property-chat-bot
    document.querySelectorAll('.open-post-property-chat-bot').forEach(element => {
        element.addEventListener('click', toggleChatbot);
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChatbot();
            }
        });
    });
}


async function initializeChatbot() {
    createChatbotElements();
    injectChatbotStyles();
    // await loadConfig(); // Wait for API keys to load
    initializePropertyListingChatbot();
}

initializeChatbot();
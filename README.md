# 🕹️ Gamepad to UDP 🚀

Welcome to Gamepad to UDP! This project is a Svelte component that transforms your joystick data into UDP packets and sends them to a receiving program. It also provides a user-friendly interface for joystick selection, IP/port configuration, and data visualization.

## 🌟 Features

* 🎮 User-friendly interface for joystick selection, IP/port configuration, and data visualization.
* 📚 Uses the `joypad.js` library for seamless joystick access.
* 📡 Transmits both axes and buttons (mapped to a 0-255 range).
* 📝 Includes a null terminator at the end of each data packet for easy parsing.
* ⏱️ Configurable sample rate for data transmission, allowing for fine-tuned control.

## 🚀 Installation

1. **Prerequisites:** Make sure you have Node.js and npm (or pnpm) installed on your machine.
2. **Clone the repository:** Use `git clone https://github.com/bjkemp/gamepad-to-udp` to get a local copy of this project.
3. **Install dependencies:** Navigate to the project directory and run `npm install` (or `pnpm install`) to install all the necessary packages.

## 🎮 Usage

1. **Start the development server:** Run `npm run dev` (or `pnpm run dev`) to fire up the development server, usually accessible at `http://localhost:5173/`.
2. **Select joystick and configure:** Use the intuitive UI to select your desired joystick and enter the destination IP address and port number.
3. **Control:** Move the joystick axes and buttons to send data. The sent data will be displayed in the UI, giving you real-time feedback.

Enjoy controlling your applications with your joystick! 🎉
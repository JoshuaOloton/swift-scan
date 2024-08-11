# Swift-Scan Mobile App

Swift-Scan is a modern self-checkout mobile application designed to revolutionize the supermarket shopping experience. Developed using React Native and Firebase, this innovative app allows users to scan, manage, and pay for their purchases directly from their smartphones, eliminating the need for traditional cashier-based checkout systems.

## Features

- **Efficient Checkout**: Say goodbye to long queues and waiting times at the checkout counter.
- **Product Scanning**: Easily scan items using your smartphone camera for quick and accurate checkout.
- **Cart Management**: Add, remove, and adjust quantities of items in your virtual shopping cart with ease.
- **Secure Payments**: Pay securely using integrated payment gateways, including credit/debit cards and mobile wallets. 
- **Real-time Receipts**: Receive instant digital receipts for all transactions, accessible directly from the app.

## Installation

1. Clone the repository: `git clone https://github.com/JoshuaOloton/swift-scan.git`
2. Install dependencies: `npm install`
3. Set up Firebase: Follow the instructions in the [Firebase documentation](https://firebase.google.com/docs/web/setup) to set up Firebase for your project.
4. Configure Firebase credentials: Replace the Firebase configuration in `src/firebase/config.js` with your own Firebase project credentials.
5. Run the app: `npm run dev` or `react-native run-android` / `react-native run-ios`

## Customer Workflow
The workflow from the customer’s access point is shown below: 
- #### Login
    - The user provides their valid username/email and password to gain access to the customer interface.
- #### Product Scanning
    - Customers utilize the barcode scanner on the app to scan products.
    - Product details and prices are displayed upon successful scanning.
    - Selected products are added to the customer's online cart.
- #### Shopping Process
    - Customers continue shopping, scanning, and adding products to their carts.
    - A user-friendly interface ensures a seamless shopping experience.
- #### Checkout and Payment
    - Customers proceed to checkout.
    - The app facilitates payment through a trusted payment provider using the customer's credit card details.
    - An online receipt is generated upon successful payment.
- #### In-Store Checkout
    - Customers present the online receipt at a dedicated checkout counter.
    - The attendant verifies the items, expediting the process as scanning and payment have already been completed.
- #### Finalization
    - Items are packed, and the customer can promptly depart from the supermarket or shopping mall.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements, bug fixes, or feature requests.

## License

This project is licensed under the [MIT License](LICENSE).


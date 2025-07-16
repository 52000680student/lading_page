// API utility functions
const API_URL = "https://script.google.com/macros/s/AKfycbwn8BjuMbEXpgAf_q8z9JrnMsTRD2o24ckznlg7oRxoM6PyjVHfON7gIp3g_SyyZ6RPPA/exec";

export interface RegistrationData {
    name: string;
    testPackage: string;
    phone: string;
    address: string;
    appointmentTime: string;
    otherRequirements: string;
}

export const submitRegistration = async (data: RegistrationData): Promise<boolean> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                name: data.name || "",
                testPackage: data.testPackage || "",
                phone: data.phone || "",
                address: data.address || "",
                appointmentTime: data.appointmentTime || "",
                otherRequirements: data.otherRequirements || "",
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error submitting registration:', error);
        return false;
    }
};

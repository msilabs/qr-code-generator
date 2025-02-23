function generateQRCode() {
    let text = document.getElementById("text-input").value;
    let qrContainer = document.getElementById("qr-container");
    
    qrContainer.innerHTML = ""; // Clear previous QR code

    if (text.trim() !== "") {
        let qr = new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200
        });
    } else {
        alert("Please enter a valid text or URL!");
    }
}

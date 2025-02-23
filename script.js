let qrContainer = document.getElementById("qr-container");
let downloadBtn = document.getElementById("download-btn");
let copyBtn = document.getElementById("copy-btn");
let loader = document.getElementById("loader");

function generateQRCode() {
    let text = document.getElementById("text-input").value;
    qrContainer.innerHTML = "";
    loader.style.display = "block";

    if (text.trim() !== "") {
        setTimeout(() => {
            let qr = new QRCode(qrContainer, {
                text: text,
                width: 160,
                height: 160,
                correctLevel: QRCode.CorrectLevel.H
            });
            loader.style.display = "none";
            downloadBtn.style.display = "block";
            copyBtn.style.display = "block";
        }, 500);
    } else {
        loader.style.display = "none";
        alert("Please enter a valid text or URL!");
    }
}

function downloadQRCode() {
    let qrCanvas = qrContainer.querySelector("canvas");
    if (qrCanvas) {
        let newCanvas = document.createElement("canvas");
        let ctx = newCanvas.getContext("2d");
        let padding = 16;
        
        newCanvas.width = qrCanvas.width + padding * 2;
        newCanvas.height = qrCanvas.height + padding * 2;
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        ctx.drawImage(qrCanvas, padding, padding);
        
        let qrImage = newCanvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = qrImage;
        a.download = "qr_code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function copyQRCode() {
    let qrCanvas = qrContainer.querySelector("canvas");
    if (qrCanvas) {
        let newCanvas = document.createElement("canvas");
        let ctx = newCanvas.getContext("2d");
        let padding = 16;
        
        newCanvas.width = qrCanvas.width + padding * 2;
        newCanvas.height = qrCanvas.height + padding * 2;
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        ctx.drawImage(qrCanvas, padding, padding);
        
        newCanvas.toBlob(blob => {
            let item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]).then(() => {
                alert("QR Code copied to clipboard!");
            }).catch(err => {
                console.error("Copy failed: ", err);
            });
        });
    }
}

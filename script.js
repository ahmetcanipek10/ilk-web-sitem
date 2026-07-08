let sepet = [];
let sepetAdetElement = document.getElementById('sepetAdet');
let sepetIcerikElement = document.getElementById('sepetIcerik');
let sepetToplamElement = document.getElementById('sepetToplam');
let sepetPaneli = document.getElementById('sepetPaneli');

// Sepeti sağdan açıp kapatan fonksiyon
function sepetiAcKapat() {
    if (!sepetPaneli) return;
    if (sepetPaneli.style.right === "0px") {
        sepetPaneli.style.right = "-350px";
    } else {
        sepetPaneli.style.right = "0px";
    }
}

// Ürün butonuna basıldığında çalışacak fonksiyon
function sepeteEkle(urunAdi, fiyat) {
    // Ürün sepette zaten var mı kontrol et
    let varOlanUrun = sepet.find(item => item.ad === urunAdi);
    
    if (varOlanUrun) {
        varOlanUrun.adet += 1;
    } else {
        sepet.push({ ad: urunAdi, fiyat: fiyat, adet: 1 });
    }
    
    // Sepetin içini ve sayıları güncelle
    sepetiGuncelle();
    
    // Ürün eklenince sepet panelini sağdan otomatik aç
    if (sepetPaneli) {
        sepetPaneli.style.right = "0px";
    }
}

// Sepetin içindeki listeyi ve toplam fiyatı tazeleyen fonksiyon
function sepetiGuncelle() {
    if (!sepetAdetElement || !sepetIcerikElement || !sepetToplamElement) return;

    // Toplam ürün adeti hesabı
    let toplamAdet = sepet.reduce((toplam, item) => toplam + item.adet, 0);
    sepetAdetElement.innerText = toplamAdet;
    
    // Sepet boşsa ekranda yazı göster
    if (sepet.length === 0) {
        sepetIcerikElement.innerHTML = "Sepetiniz şu anda boş.";
        sepetIcerikElement.style.justifyContent = "center";
        sepetToplamElement.innerText = "0.00 TL";
        return;
    }
    
    // Sepette ürün varsa listeyi HTML olarak oluştur
    sepetIcerikElement.style.justifyContent = "flex-start";
    sepetIcerikElement.innerHTML = sepet.map((item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: rgba(0,0,0,0.03); padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);">
            <div style="text-align: left;">
                <div style="font-weight: 600; color: var(--text-color); font-size: 0.9rem;">${item.ad}</div>
                <div style="font-size: 0.8rem; color: #64748b;">${item.adet} adet x ${item.fiyat} TL</div>
            </div>
            <button onclick="sepettenCikar(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-weight: 700; font-size: 0.85rem; padding: 5px;">Sil</button>
        </div>
    `).join('');
    
    // Toplam para hesabı
    let toplamFiyat = sepet.reduce((toplam, item) => toplam + (item.fiyat * item.adet), 0);
    sepetToplamElement.innerText = toplamFiyat.toFixed(2) + " TL";
}

// Sepetten ürün silme fonksiyonu
function sepettenCikar(index) {
    sepet.splice(index, 1);
    sepetiGuncelle();
}
// Ödeme ekranını açan fonksiyon
function odemeEkraniniAc() {
    // Sepet boşsa ödeme ekranını açma, uyarı ver
    if (sepet.length === 0) {
        alert("Lütfen önce sepetinize ürün ekleyin!");
        return;
    }
    
    // Sepet panelini sağa gizle
    if (sepetPaneli) sepetPaneli.style.right = "-350px";
    
    // Ödeme ekranının toplam tutarını sepet toplamıyla eşitle
    let odemeToplamElement = document.getElementById('odemeToplam');
    if (odemeToplamElement && sepetToplamElement) {
        odemeToplamElement.innerText = sepetToplamElement.innerText;
    }
    
    // Ödeme ekranını (pop-up) görünür yap
    let odemeEkrani = document.getElementById('odemeEkranı');
    if (odemeEkrani) odemeEkrani.style.display = "flex";
}

// Ödeme yap butonuna basıldığında çalışacak simülasyon fonksiyonu
function siparisTamamla(event) {
    event.preventDefault(); // Sayfanın F5 atıp yenilenmesini engeller
    
    alert("🎉 Tebrikler Ahmet Can! Ödeme başarıyla alındı ve siparişiniz sisteme düştü. (E-Ticaret Altyapı Simülasyonu Başarılı)");
    
    // Sepeti tamamen boşalt
    sepet = [];
    sepetiGuncelle();
    
    // Ödeme ekranını kapat
    let odemeEkrani = document.getElementById('odemeEkranı');
    if (odemeEkrani) odemeEkrani.style.display = "none";
}
// Hesabım menüsünü açıp kapatan fonksiyon
function profilMenusuAcKapat() {
    let dropdown = document.getElementById('profilDropdown');
    if (!dropdown) return;
    
    if (dropdown.style.display === "flex") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "flex";
    }
}
# 🚀 Vercel'de Deployment

## Hızlı Başlangıç

### 1. Vercel Hesabı
- [vercel.com](https://vercel.com) adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Repository Import
1. Vercel dashboard'da "Add New Project" butonuna tıklayın
2. GitHub repository listesinden `HELTHY-meals` projesini seçin
3. Import butonuna tıklayın

### 3. Proje Ayarları

**Framework Preset:** Next.js (otomatik algılanacak)

**Build Settings:**
- Build Command: `npm run build` (otomatik)
- Output Directory: `.next` (otomatik)
- Install Command: `npm install` (otomatik)

**Environment Variables:**
- Bu proje için environment variable gerekmez (tüm veri client-side)

### 4. Deploy

"Deploy" butonuna tıklayın! 🎉

Deployment 1-2 dakika içinde tamamlanacak.

## Deployment Sonrası

### Domain
Vercel size otomatik bir domain verecek:
```
https://helthy-meals-{hash}.vercel.app
```

### Custom Domain (Opsiyonel)
1. Vercel dashboard'da projenizin "Settings" > "Domains" bölümüne gidin
2. Kendi domain'inizi ekleyin
3. DNS ayarlarınızı Vercel'in verdiği bilgilerle güncelleyin

## Otomatik Deploymentlar

Her `git push` işleminde:
- **Ana branch:** Production'a deploy olur
- **Diğer branchler:** Preview deployment oluşturulur

## Performance

Bu Next.js uygulaması statik olarak render edilir:
- ⚡ Çok hızlı yükleme
- 💰 Düşük maliyet
- 🌍 Global CDN
- 📱 Mobil optimized

## Monitoring

Vercel dashboard'da:
- Deployment logları
- Analytics
- Performance metrikleri
- Error tracking

görüntüleyebilirsiniz.

## Troubleshooting

### Build Hatası
```bash
# Lokal test
npm run build
```

### Cache Temizleme
Vercel dashboard > Settings > General > "Clear Build Cache"

## Önemli Notlar

1. **Veri Saklama:** Tüm veriler browser'da saklanır (LocalStorage)
2. **Backup:** Kullanıcılara düzenli "Dışa Aktar" önerilmeli
3. **Cross-device:** Veriler cihazlar arası senkronize OLMAZ
4. **Privacy:** Sunucuya hiçbir veri gönderilmez

## Next Steps

Deployment'tan sonra yapılabilecekler:
- [ ] Custom domain ekleme
- [ ] Analytics entegrasyonu
- [ ] SEO optimizasyonları
- [ ] Backend/database entegrasyonu (opsiyonel)
- [ ] User authentication (opsiyonel)

---

**Vercel Documentation:** https://vercel.com/docs

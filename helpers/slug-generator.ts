export function generateSlug(name: string): string {
    // Türkçe karakterleri ve noktalama işaretlerini kaldıran düzenli ifade
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/gi, '-') // Alfa numerik olmayan karakterleri '-' ile değiştirir
        .replace(/-+/g, '-') // Birden fazla '-' karakterini tek bir '-' ile değiştirir
        .replace(/^-|-$/g, ''); // Başta ve sonda bulunan '-' karakterlerini kaldırır
  
    // Türkçe karakterleri kaldırdıktan sonra slug oluştur
    const cleanedName = slugify(name);
  
    // 6 haneli rastgele sayısal string oluştur
    const randomString = Math.random().toString(36).substring(2, 8); // 6 haneli rastgele string
  
    // Slug oluştur
    const slug = `${cleanedName}-${randomString}`;
  
    return slug;
  }
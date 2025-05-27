import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

// Simple translations for multi-language support
const translations = {
  en: {
    enterUrl: 'Enter TikTok URL',
    detect: 'Detect Content',
    detectedType: 'Detected Content Type:',
    video: 'Video',
    photo: 'Photo',
    music: 'Music',
    downloadOptions: 'Download Options',
    download: 'Download',
    selectLanguage: 'Select Language',
    changeLogo: 'Change Logo',
  },
  az: {
    enterUrl: 'TikTok URL daxil edin',
    detect: 'Məzmunu aşkar et',
    detectedType: 'Aşkar edilmiş məzmun növü:',
    video: 'Video',
    photo: 'Şəkil',
    music: 'Mahnı',
    downloadOptions: 'Yükləmə variantları',
    download: 'Yüklə',
    selectLanguage: 'Dil seçin',
    changeLogo: 'Loqonu dəyiş',
  },
  tr: {
    enterUrl: 'TikTok URL\'si girin',
    detect: 'İçeriği Tespit Et',
    detectedType: 'Tespit Edilen İçerik Türü:',
    video: 'Video',
    photo: 'Fotoğraf',
    music: 'Müzik',
    downloadOptions: 'İndirme Seçenekleri',
    download: 'İndir',
    selectLanguage: 'Dil Seçin',
    changeLogo: 'Logoyu Değiştir',
  },
  ru: {
    enterUrl: 'Введите URL TikTok',
    detect: 'Определить контент',
    detectedType: 'Определенный тип контента:',
    video: 'Видео',
    photo: 'Фото',
    music: 'Музыка',
    downloadOptions: 'Варианты загрузки',
    download: 'Скачать',
    selectLanguage: 'Выберите язык',
    changeLogo: 'Сменить логотип',
  },
};

// Sample logos for dynamic change
const logos = [
  'https://i.imgur.com/1.png', // Replace with actual anime style logos URLs
  'https://i.imgur.com/2.png',
  'https://i.imgur.com/3.png',
];

export default function App() {
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [language, setLanguage] = useState('en');
  const [logoIndex, setLogoIndex] = useState(0);

  // Simple content type detection based on URL patterns
  const detectContentType = () => {
    if (!url) {
      setContentType('');
      return;
    }
    if (url.includes('music') || url.includes('audio')) {
      setContentType('music');
    } else if (url.includes('photo') || url.match(/\.jpg|\.png|\.jpeg/)) {
      setContentType('photo');
    } else if (url.includes('video') || url.includes('tiktok.com')) {
      setContentType('video');
    } else {
      setContentType('unknown');
    }
  };

  const t = translations[language];

  const changeLogo = () => {
    setLogoIndex((logoIndex + 1) % logos.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: logos[logoIndex] }} style={styles.logo} />
        <TouchableOpacity onPress={changeLogo} style={styles.logoButton}>
          <Text style={styles.logoButtonText}>{t.changeLogo}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>{t.selectLanguage}:</Text>
        <View style={styles.languageSelector}>
          {Object.keys(translations).map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => setLanguage(lang)}
              style={[
                styles.languageButton,
                language === lang && styles.languageButtonSelected,
              ]}
            >
              <Text style={styles.languageButtonText}>{lang.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder={t.enterUrl}
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button title={t.detect} onPress={detectContentType} />

        {contentType ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {t.detectedType} {contentType === 'unknown' ? 'Unknown' : t[contentType]}
            </Text>

            {contentType === 'video' && (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsTitle}>{t.downloadOptions}:</Text>
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>1080p</Text>
                </TouchableOpacity>
              </View>
            )}

            {contentType === 'music' && (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsTitle}>{t.downloadOptions}:</Text>
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>MP3 128kbps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>MP3 320kbps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>M4A 128kbps</Text>
                </TouchableOpacity>
              </View>
            )}

            {contentType === 'photo' && (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsTitle}>{t.downloadOptions}:</Text>
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>Original Size</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>{t.download}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 60,
  },
  logoButton: {
    marginBottom: 20,
  },
  logoButtonText: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  languageSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#0f3460',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  languageButtonSelected: {
    backgroundColor: '#e94560',
  },
  languageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 12,
  },
  optionsTitle: {
    color: '#e94560',
    fontSize: 16,
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: '#0f3460',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#e94560',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

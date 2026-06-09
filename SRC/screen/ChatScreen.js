import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ChatScreen = ({ navigation, route }) => {
  const { sellerName } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Halo, ada yang bisa saya bantu terkait pesanan Anda?', sender: 'seller' },
    { id: '2', text: 'Halo, saya mau tanya tentang status pengiriman pesanan saya.', sender: 'user' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={26} color="#43334C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{sellerName}</Text>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.sellerBubble,
              ]}
            >
              <Text style={msg.sender === 'user' ? styles.userText : styles.sellerText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ketik pesan Anda..."
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Feather name="send" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#43334C' },
  messagesContainer: { padding: 15 },
  messageBubble: { padding: 12, borderRadius: 18, maxWidth: '80%', marginBottom: 10 },
  userBubble: { backgroundColor: '#E83C91', alignSelf: 'flex-end' },
  sellerBubble: { backgroundColor: 'white', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E0E0E0' },
  userText: { color: 'white', fontSize: 15 },
  sellerText: { color: '#43334C', fontSize: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee' },
  textInput: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 15, marginRight: 10, fontSize: 15 },
  sendButton: { backgroundColor: '#E83C91', borderRadius: 25, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
});

export default ChatScreen;
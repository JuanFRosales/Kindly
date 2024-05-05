/*import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';


const GoodDeedsSuggestions = () => {
  const [suggestion, setSuggestion] = useState('');

  const fetchSuggestion = async () => {
    try {
      const response = await fetch('https://chatgpt.com/api/good-deeds/suggestion');
      const { suggestion } = await response.json();
      setSuggestion(suggestion);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const handleRefresh = () => {
    fetchSuggestion();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        Here's a suggestion for a good deed:
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{suggestion}</Text>
      <Button title="Get Another Suggestion" onPress={handleRefresh} />
    </View>
  );
};

export default GoodDeedsSuggestions;
*/

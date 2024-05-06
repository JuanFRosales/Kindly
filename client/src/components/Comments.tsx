import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Card, Button, ListItem } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../hooks/ContextHooks";
import { Comment, MediaItemWithOwner } from "../types/DBTypes";
import { useComment } from "../hooks/apiHooks";
import { StyleSheet, View } from "react-native";

const Comments = ({ item }: { item: MediaItemWithOwner }) => {
  const [comments, setComments] = useState<
    (Comment & {
      username: string;
    })[]
  >([]);
  const { user } = useUserContext();
  const { getCommentsByMediaId, postComment } = useComment();
  const navigation = useNavigation();

  const initValues = { comment_text: "" };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initValues,
  });

  const doComment = async (inputs: { comment_text: string }) => {
    const token = await AsyncStorage.getItem("token");
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      await getComments();
      // resetoi lomake
      reset();
    } catch (error) {
      console.error("postComment failed", error);
    }
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      console.log("getComments failed", error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();

    const unsubscribe = navigation.addListener("focus", () => {
      reset();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {comments.length > 0 && (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Comments:</Card.Title>
          {comments.map((comment, index) => (
            <ListItem key={index} containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItem.Subtitle style={styles.subtitle}>
                  {new Date(comment.created_at).toLocaleDateString('fi-FI')} {comment.username}
                </ListItem.Subtitle>
                <ListItem.Title>{comment.comment_text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      )}
      {user && (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Post Comment</Card.Title>
          <Controller
            control={control}
            rules={{ required: 'Comment is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.comment_text?.message}
                placeholder="What do you think?"
                multiline
              />
            )}
            name="comment_text"
          />
          <Button onPress={handleSubmit(doComment)} title="Post" />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 161, 146, 0.9)',
    borderColor: 'peachpuff',
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '90%',
  },
  cardTitle: {
    color: '#751102',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  listItem: {
    backgroundColor: 'rgba(255, 161, 146, 0.9)',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Comments;

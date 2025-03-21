import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const createPost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "posts"), {
        content: newPost,
        timestamp: serverTimestamp(),
      });
      setNewPost("");
    } catch (err) {
      setError("Error al publicar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Foros de Blocksonline</h1>
      <div className="my-4">
        <textarea
          className="border p-2 w-full h-24 resize-none"
          placeholder="Escribe un nuevo post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          disabled={loading}
        />
        <Button onClick={createPost} className="mt-2" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div>
        {posts.map((post) => (
          <Card key={post.id} className="mb-2">
            <CardContent>
              <p>{post.content}</p>
              <small className="text-gray-500">
                {post.timestamp?.seconds
                  ? format(new Date(post.timestamp.seconds * 1000), "PPpp")
                  : "Cargando..."}
              </small>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

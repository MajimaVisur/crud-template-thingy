/**
 * CRUD INTEGRATION GUIDE
 * 
 * Your CRUD template is in:
 *   - src/lib/posts.ts  (database operations for posts)
 *   - src/lib/users.ts  (database operations for users)
 *   - src/api/posts.ts  (API endpoints for posts)
 *   - src/api/auth.ts   (login/register endpoints)
 * 
 * ROUTING PATTERN:
 * 
 * 1. Add routes to App.tsx:
 *    <Route path="/dashboard" element={<Dashboard />} />
 *    <Route path="/posts" element={<PostsPage />} />
 * 
 * 2. Create page components that fetch from API
 * 
 * 3. API calls from frontend:
 *    - GET /api/posts - list all posts
 *    - GET /api/posts/:id - get single post
 *    - POST /api/posts - create post (needs auth token)
 *    - PUT /api/posts/:id - update post (needs auth token)
 *    - DELETE /api/posts/:id - delete post (needs auth token)
 * 
 * EXAMPLE - Create a Posts Page:
 * 
 * import { useState, useEffect } from "react";
 * 
 * export default function PostsPage() {
 *   const [posts, setPosts] = useState([]);
 *   const [title, setTitle] = useState("");
 *   const token = localStorage.getItem("token");
 * 
 *   useEffect(() => {
 *     fetchPosts();
 *   }, []);
 * 
 *   async function fetchPosts() {
 *     const response = await fetch("/api/posts");
 *     const data = await response.json();
 *     setPosts(data.posts);
 *   }
 * 
 *   async function createPost() {
 *     const response = await fetch("/api/posts", {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         "Authorization": `Bearer ${token}`
 *       },
 *       body: JSON.stringify({ title, description: "" })
 *     });
 *     const data = await response.json();
 *     setPosts([...posts, data.post]);
 *     setTitle("");
 *   }
 * 
 *   async function deletePost(id) {
 *     await fetch(`/api/posts/${id}`, {
 *       method: "DELETE",
 *       headers: { "Authorization": `Bearer ${token}` }
 *     });
 *     setPosts(posts.filter(p => p.id !== id));
 *   }
 * 
 *   return (
 *     <div>
 *       <h1>Posts</h1>
 *       <input value={title} onChange={(e) => setTitle(e.target.value)} />
 *       <button onClick={createPost}>Create Post</button>
 *       {posts.map(post => (
 *         <div key={post.id}>
 *           <h2>{post.title}</h2>
 *           <button onClick={() => deletePost(post.id)}>Delete</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

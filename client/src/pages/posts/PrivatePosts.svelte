<script>
    import { BASE_URL } from "../../stores/globalsStore";
    import { onMount } from "svelte";
    import toastr from "toastr";

    let privatePosts = [];
    async function getPosts() {
        const response = await fetch($BASE_URL + "/api/posts", {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        if (response.status === 200) {
            privatePosts = data.posts;
        } else {
            toastr.error(data.message);
        }
    }
    async function handleDeletePost(postId) {
        if (confirm("Are you sure you want to delete this post?")) {
            const reponse = await fetch($BASE_URL + `/api/posts/${postId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await reponse.json();
            if (reponse.status === 200) {
                toastr.success(data.message);
                getPosts();
            } else {
                toastr.error(data.message);
            }
        }
    }
    async function handlePublish(postId) {
        if (confirm("Are you sure you want to publish this post?")) {
            const response = await fetch($BASE_URL + `/api/posts/${postId}`, {
                method: "PATCH",
                credentials: "include",
            });
            const data = await response.json();
            if (response.status === 200) {
                toastr.success(data.message);
                getPosts();
            } else {
                toastr.error(data.message);
            }
        }
    }
    onMount(() => {
        getPosts();
    });

    let showForm = false;
    let title = "";
    let content = "";
    let is_published = false;
    function toggleForm() {
        showForm = !showForm;
        if (showForm) {
            document.getElementById("new-post-btn").innerText = "Cancel";
        } else {
            document.getElementById("new-post-btn").innerText = "New Post";
            if (title !== "" || content !== "" || is_published !== false) {
                if (confirm("Are you sure you want to cancel?")) {
                    title = "";
                    content = "";
                    is_published = false;
                } else {
                    document.getElementById("new-post-btn").innerText =
                        "Cancel";
                    showForm = true;
                }
            }
        }
    }

    async function handleSubmitPost() {
        const response = await fetch($BASE_URL + "/api/posts", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                is_published,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.success(data.message);
            getPosts();
            title = "";
            content = "";
            is_published = false;
            showForm = false;
            document.getElementById("new-post-btn").innerText = "New Post";
        } else {
            toastr.error(data.message);
        }
    }
</script>

<main>
    <h1>My Posts</h1>

    <div class="new-post">
        <button id="new-post-btn" on:click={() => toggleForm()}>
            New Post
        </button>
        {#if showForm}
            <form
                class="new-post-form"
                on:submit|preventDefault={handleSubmitPost}
            >
                <div>
                    <label for="title">Title</label>
                    <input
                        required
                        type="text"
                        id="title"
                        bind:value={title}
                        placeholder="Enter a title"
                        class="input-field"
                    />
                </div>
                <div>
                    <label for="content">Content</label>
                    <textarea
                        cols="60"
                        rows="10"
                        required
                        id="content"
                        bind:value={content}
                        placeholder="Enter your post content"
                        class="input-field text-area"
                    />
                </div>
                <div class="checkbox-container">
                    <input
                        type="checkbox"
                        id="is_published"
                        bind:checked={is_published}
                        class="checkbox-input"
                    />
                    <label for="is_published" class="checkbox-label">
                        Publish this post
                    </label>
                </div>
                <button type="submit" class="submit-button">Submit</button>
            </form>
        {/if}
    </div>
    <ul class="post-list">
        {#each privatePosts as post}
            <li class="post-item">
                <div class="post-status-box">
                    <div
                        class="post-status {post.is_published
                            ? 'published'
                            : 'draft'}"
                    >
                        {post.is_published ? "Published" : "Draft"}
                    </div>
                </div>
                <h2>{post.title}</h2>
                <p class="content">{post.content}</p>
                <p class="author">By {post.author}</p>
                <div class="post-actions">
                    <button on:click={() => handleDeletePost(post.id)}>
                        Delete
                    </button>
                    {#if !post.is_published}
                        <button on:click={() => handlePublish(post.id)}>
                            Publish
                        </button>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</main>

<style>
    .new-post {
        margin-bottom: 20px;
    }

    .post-list {
        list-style: none;
        padding: 0;
    }

    .post-item {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
    }

    .post-item h2 {
        margin-top: 0;
    }

    .post-actions {
        margin-top: 10px;
    }

    .post-actions button {
        margin-right: 10px;
    }
    .author {
        font-style: italic;
        margin-top: 5px;
        font-size: small;
        float: right;
    }
    .post-status-box {
        float: right;
    }
    .published {
        background-color: #4caf50;
        color: white;
        border: 1px solid #4caf50;
        padding: 5px;
    }

    .draft {
        background-color: #f44336;
        color: white;
        border: 1px solid #f44336;
        padding: 5px;
    }
    .content {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .input-field {
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 15px 0;
        margin-bottom: 20px;
        font-size: 16px;
        font-family: Arial, sans-serif;
        text-indent: 10px;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .checkbox-input {
        margin-right: 10px;
    }

    .checkbox-label {
        font-size: 16px;
        font-family: Arial, sans-serif;
    }

    .submit-button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        font-family: Arial, sans-serif;
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #3e8e41;
    }

    .new-post-form {
        padding: 2%;
    }
    .text-area {
        text-indent: 0 !important;
        padding: 10px;
    }
</style>

<script>
    import { BASE_URL } from "../../stores/globalsStore";
    import { onMount } from "svelte";
    import toastr from "toastr";

    let publicPosts = [];
    async function getPosts() {
        const response = await fetch($BASE_URL + "/api/published/posts", {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        if (response.status === 200) {
            publicPosts = data
        } else {
            toastr.error(data.message);
        }
    }
    onMount(() => {
        getPosts();
        console.log(publicPosts)
    });
</script>

<main>
    <h1>Welcome to PostPoints</h1>
    <p>
        This is a simple blog app that allows you to create posts and share them
        with the world.
    </p>
    <ul class="post-list">
        {#each publicPosts as post}
            <li class="post-item">
                <h2>{post.title}</h2>
                <p class="content">{post.content}</p>
                <p class="author">By {post.author}</p>
            </li>
        {/each}
    </ul>
</main>

<style>
    .post-list {
        list-style: none;
        padding: 0;
    }

    .post-item {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 3%;
    }

    .post-item h2 {
        margin-top: 0;
    }
    .author {
        font-style: italic;
        margin-top: 5px;
        font-size: small;
        float: right;
    }
</style>

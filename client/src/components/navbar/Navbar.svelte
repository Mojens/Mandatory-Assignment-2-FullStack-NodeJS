<script>
    import { Link } from "svelte-navigator";
    import { user } from "../../stores/userStore.js";
    import { BASE_URL } from "../../stores/globalsStore.js";
    import toastr from "toastr";

    $: navigationLinks = [
        {
            path: "/",
            name: "Home",
        },
        ,
        $user
            ? {
                  path: "/profile",
                  name: "Profile",
              }
            : null,
        $user
            ? {
                  path: "/posts",
                  name: "Posts",
              }
            : null,
        $user
            ? {
                  path: "/logout",
                  name: "Logout",
              }
            : {
                  path: "/login",
                  name: "Login",
              },
    ].filter(Boolean);

    async function handleLogout() {
        const response = await fetch($BASE_URL + "/api/logout", {
            method: "POST",
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.error(data.message);
            localStorage.removeItem("user");
            user.set(null);
            $user = null;
        } else {
            toastr.error(data.message);
        }
    }
</script>

<header>
    <nav>
        <Link to="/">
            <h1>PostPoints</h1>
        </Link>
        <div class="nav-links">
            {#each navigationLinks as link}
                {#if link.name === "Logout"}
                    <Link
                        to={"/"}
                        class="nav-link"
                        on:click={handleLogout}
                        on:keypress={handleLogout}>{link.name}</Link
                    >
                {:else}
                    <Link class="nav-link" to={link.path}>{link.name}</Link>
                {/if}
            {/each}
        </div>
    </nav>
</header>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color 0.25s ease-out, color 0.25s ease-out;
        z-index: 9999;
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

    @media (prefers-color-scheme: light) {
        :root {
            --text-color: #213547;
            --bg-color: #ffffff;
            --hover-text-color: #ffffff;
            --hover-bg-color: #747bff;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --text-color: rgba(255, 255, 255, 0.87);
            --bg-color: #242424;
            --hover-text-color: #ffffff;
            --hover-bg-color: #535bf2;
        }
    }
</style>

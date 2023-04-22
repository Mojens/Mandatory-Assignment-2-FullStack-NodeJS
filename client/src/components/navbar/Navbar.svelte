<script>
    import { Link } from "svelte-navigator";

    export const navigationLinks = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/login",
            name: "Login",
        },
    ];
</script>

<header>
    <nav>
        <Link to="/">
            <h1>My App</h1>
        </Link>
        <div class="nav-links">
            {#each navigationLinks as link}
                <Link class="nav-link" to={link.path}>{link.name}</Link>
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
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

    /* Light mode */
    @media (prefers-color-scheme: light) {
        :root {
            --text-color: #213547;
            --bg-color: #ffffff;
            --hover-text-color: #ffffff;
            --hover-bg-color: #747bff;
        }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
        :root {
            --text-color: rgba(255, 255, 255, 0.87);
            --bg-color: #242424;
            --hover-text-color: #ffffff;
            --hover-bg-color: #535bf2;
        }
    }
</style>

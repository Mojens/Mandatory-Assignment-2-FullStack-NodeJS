<script>
    import toastr from "toastr";

    let email = "test@outlook.dk";
    let password = "1234";

    function handleLogin() {
        toastr.success("Login successful!");
        //toastr.error("Login failed!");
    }
</script>

<main>
    <h1>Login</h1>

    <form on:submit|preventDefault={handleLogin}>
        <label>
            Email:
            <input type="email" bind:value={email} required />
        </label>

        <label>
            Password:
            <input type="password" bind:value={password} required />
        </label>

        <button type="submit">Log in</button>
    </form>
</main>

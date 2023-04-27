<script>
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/globalsStore.js";

    let email = "";
    let password = "";
    let confirm_password = "";
    let first_name = "";
    let last_name = "";

    async function handleRegister() {
        const response = await fetch($BASE_URL + "/api/register", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                confirm_password,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.success(data.message);
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } else {
            toastr.error(data.message);
        }
    }
</script>

<main>
    <div class="container">
        <div class="form-container">
            <h1 class="h1-c">Sign Up</h1>
            <p>Please enter your details to create an account.</p>
            <form on:submit|preventDefault={handleRegister}>
                <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        bind:value={first_name}
                        required />
                </div>
                <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        bind:value={last_name}
                        required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        required />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        required />
                </div>
                <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={confirm_password}
                        required />
                    <div class="form-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </div>
            </form>

            <div class="form-links">
                <a href="/forgot-password">Forgot password?</a>
                <span id="form-link-divider">|</span>
                <a href="/login">Already registered?</a>
            </div>
        </div>
    </div>
</main>

<style>
    :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --purple-color: #747bff;
        --background-color: #f5f5f5;
        --text-color: #333333;
        --form-width: 400px;
        --form-padding: 30px;
    }

    * {
        box-sizing: border-box;
    }

    a {
        color: var(--primary-color);
    }

    a:hover {
        color: #0056b3;
    }

    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
    }

    .form-container {
        width: var(--form-width);
        margin: 0 auto;
        padding: var(--form-padding);
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    }

    .form-container h1 {
        margin-top: 0;
        font-size: 2rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .form-group input {
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid var(--secondary-color);
        font-size: 1.1rem;
        font-weight: 400;
        color: var(--text-color);
        background-color: #ffffff;
    }

    .form-group input:focus {
        outline: none;
        border-color: var(--primary-color);
    }

    .form-group button {
        display: block;
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border-radius: 8px;
        border: none;
        background-color: #747bff;
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.25s;
    }

    .form-group button:hover {
        background-color: #747bff;
    }

    .form-links {
        margin-top: 20px;
        font-size: 0.9rem;
        text-align: center;
    }

    .form-links a {
        margin: 0 10px;
    }

    @media screen and (max-width: 480px) {
        :root {
            --form-width: 90%;
            --form-padding: 20px;
        }
    }
    h1,
    label,
    p {
        color: #747bff !important;
    }
</style>

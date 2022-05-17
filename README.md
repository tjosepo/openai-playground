# OpenAI Playground

Web GUI for the Open AI API, built using [Deno](https://deno.land/).

### Running locally

Get an OpenAI API key from the
[Open AI website](https://beta.openai.com/signup).

Store the API key in an environment variable named `OPENAI_KEY`. You can store
it in a `.env` file.

Then, using Deno, run:

```
deno task start
```

After adding, removing, or moving a page in the `routes` or directory, or
adding, removing, or moving an island in the `islands` directory, run:

```
deno task manifest
```

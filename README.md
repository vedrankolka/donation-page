# Accept a payment examples in React for Payment Element

This repository is a modified example of Stripe's [quickstart](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout) for accepting a payment, built solely out of curiosity.

## How to run locally

This is the React client for the sample and runs independently of the server. The backend URL is set through the environment variable `REACT_APP_DONATION_SERVER_URL`, which can be set in `scripts` in [`package.json`](./package.json) when running with `npm`.
To run the React client locally:

1. Install dependencies

From this directory run:

```sh
npm install
```

2. Start the react app

```sh
npm start
```

This will start the react server running on localhost:3000. API requests to the backend are proxied by the
create-react-app server using the `proxy` setting in `./package.json`.

## How to deploy to Fly.io
[Fly.io](https://fly.io) offers an easy (and free for 2 small machines) way to deploy apps using
a [`Dockerfile`](./Dockerfile) and a [`fly.toml`](./fly.toml).
To build the docker image on your own machine (because building on Fly isn't free)
and deploy to one of the free machines, run:

```sh
fly deploy --vm-size shared-cpu-1x --local-only
```

The `vm-size` specifies the small (free) machine, while `local-only` flag specifies that the image should be built locally,
which means Docker should be running.


## TODO
- [x] extract stuff (like backend url) to .env and read from env
- [x] add multistage Dockerfile
- [x] change displayed currency to EUR
- [x] enforce a minimum donation amount
- [ ] enforce all fields to be filled before donating
- [x] update README
- [x] change favicon.ico

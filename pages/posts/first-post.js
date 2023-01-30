import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
                <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => console.log("It's Loaded Man!")}
                />
            </Head>
            <div>
                <h1>Hello, World.</h1>
                <h2><Link href="/">Back To Home</Link></h2>
            </div>
        </Layout>
    );
}
function Error404() {
    return (
        <>
            <div className="bg-black text-green-400 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-6xl font-extrabold mb-4 text-red-500">404 - Page Not Found</h1>
                <p className="text-xl font-light mb-6 max-w-2xl text-gray-400">
                    Oops! The page you’re looking for doesn’t exist. Let’s get you back on track.
                </p>
                <button 
                    onClick={() => window.location.href = "/"} 
                    className="bg-green-400 text-black font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-300 transition duration-300"
                >
                    Return to Home
                </button>
            </div>
        </>
    );
}

export default Error404;

const handler = async (event) => {
    console.log('event', event);
    return {
        statusCode: 200,
        body: '<!DOCTYPE html><html><body><div id="app"></div><script src="/dist/app.js"></script></body></html>',
    };
};

export default handler;

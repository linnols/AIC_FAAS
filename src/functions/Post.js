const { app, output } = require('@azure/functions');
const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    createIfNotExists: true,
});
app.http("LinnPost", {
    methods: ["POST"],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items', 
    handler: async (request, context) => {
        const item = request.json();
        item.id = ((Math.random()+1).toString(36))
        context.extraOutputs.get(cosmosOutput, item);
        return {
            status: 200
        };
    }
})

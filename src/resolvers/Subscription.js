const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, into) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("countChannelName", {
          count
        });
      }, 1000);

      return pubsub.asyncIterator("countChannelName");
    }
  }
};

export { Subscription as default };

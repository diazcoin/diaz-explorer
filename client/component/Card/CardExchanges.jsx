import React from 'react';

import Card from './Card';

const CardExchanges = () => {

  return (
    <Card title="Exchanges">
      {config.exchanges.map((exchange) => (
        <React.Fragment>
          <a href={exchange.link} target="_blank">{exchange.title}</a><br />
        </React.Fragment>
      ))}
    </Card>
  );
};

export default CardExchanges;

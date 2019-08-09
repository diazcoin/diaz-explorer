import React from 'react';

import Card from './Card';

const CardLinks = () => (
  <Card title="Links">
    <a href={config.socialMedia.website} target="_blank">Website</a><br />
    <a href={config.socialMedia.discord} target="_blank">Discord</a><br />
    <a href={config.socialMedia.telegram} target="_blank">Telegram</a><br />
    <a href={config.socialMedia.twitter} target="_blank">Twitter</a><br />
    <a href={config.socialMedia.bitcoinTalk} target="_blank">BitcoinTalk</a><br />
    <a href={config.socialMedia.facebook} target="_blank">Facebook</a><br />
    <a href={config.socialMedia.youtube} target="_blank">YouTube</a><br />
    <a href={config.socialMedia.github} target="_blank">Github</a><br />
    <a href={config.socialMedia.instagram} target="_blank">Instagram</a><br />
    <a href={config.socialMedia.reddit} target="_blank">Reddit</a><br />
    <a href={config.socialMedia.medium} target="_blank">Medium</a><br />
  </Card>
);

export default CardLinks;

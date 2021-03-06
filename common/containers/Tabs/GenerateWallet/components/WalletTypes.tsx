import React from 'react';
import translate, { translateRaw } from 'translations';
import { WalletType } from '../GenerateWallet';
import { Link } from 'react-router-dom';
import './WalletTypes.scss';
import { HelpLink } from 'components/ui';
import { HELP_ARTICLE, ledgerReferralURL, trezorReferralURL } from 'config';

const WalletTypes: React.SFC<{}> = () => {
  const typeInfo = {
    [WalletType.Keystore]: {
      name: 'X_KEYSTORE2',
      bullets: [
        'An encrypted JSON file, protected by a password',
        'Back it up on a USB drive',
        'Cannot be written, printed, or easily transferred to mobile',
        'Compatible with Mist, Parity, Geth',
        'Provides a single address for sending and receiving'
      ]
    },
    [WalletType.Mnemonic]: {
      name: 'X_MNEMONIC',
      bullets: [
        'A 12-word private seed phrase',
        'Back it up on paper or USB drive',
        'Can be written, printed, and easily typed on mobile, too',
        'Compatible with MetaMask, Jaxx, imToken, and more',
        'Provides unlimited addresses for sending and receiving'
      ]
    }
  };

  return (
    <div className="WalletTypes Tab-content-pane">
      <div className="WalletTypes-types row">
        <div className="col-md-3" />
        {Object.keys(typeInfo).map((type: keyof typeof typeInfo) => (
          <div key={type} className="WalletType col-md-3">
            <div className="WalletType-select">
              <Link
                className="WalletType-select-btn btn btn-primary btn-block"
                to={`/generate/${type}`}
              >
                {translate('GENERATE_THING', { $thing: translateRaw(typeInfo[type].name) })}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletTypes;

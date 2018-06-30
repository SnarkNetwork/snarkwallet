import logo from 'assets/images/cryptocurve-logo-white2.png';
import {
  donationAddressMap,
  VERSION,
  knowledgeBaseURL,
  socialMediaLinks,
  productLinks,
  affiliateLinks,
  partnerLinks
} from 'config';
import React from 'react';
import PreFooter from './PreFooter';
import DisclaimerModal from 'components/DisclaimerModal';
import { NewTabLink } from 'components/ui';
import OnboardModal from 'containers/OnboardModal';
import './index.scss';
import { translateRaw } from 'translations';

const SocialMediaLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <NewTabLink className="SocialMediaLink" key={link} href={link} aria-label={text}>
      <i className={`sm-icon sm-logo-${text}`} />
    </NewTabLink>
  );
};

interface Props {
  latestBlock: string;
}

interface State {
  isDisclaimerOpen: boolean;
}

export default class Footer extends React.PureComponent<Props, State> {
  public state: State = {
    isDisclaimerOpen: false
  };

  public render() {
    return (
      <div>
        <footer className="Footer" role="contentinfo" aria-label="footer" />
        <DisclaimerModal isOpen={this.state.isDisclaimerOpen} handleClose={this.toggleModal} />
      </div>
    );
  }

  private toggleModal = () => {
    this.setState(state => {
      this.setState({ isDisclaimerOpen: !state.isDisclaimerOpen });
    });
  };
}

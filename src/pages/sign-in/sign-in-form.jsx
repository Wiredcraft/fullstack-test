import * as React from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';

import { CONFIG } from '../../constants/config';
import { SocialSignInButton } from './social-sign-in-btn';
import { Image } from '../../components/image';
import { extractAccessToken } from '../../utils/extract-access-token';
import icLoginGithub from '../../assets/ic-login-github.png';
import icSocialLoginBtnIcon from '../../assets/ic-social-login-btn-icon.png';

const SignInFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  text-align: center;
  padding-top: ${props => props.theme.gridSize * 9}px;
`;

const LoginIconStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginMsgStyled = styled.div`
  margin-top: ${props => props.theme.gridSize * 2}px;
  max-width: 220px;
  font-size: ${props => props.theme.fontSizeBig}px;
  line-height: 150%;
`;

const OptionsMsgStyled = styled.div`
  margin-top: ${props => props.theme.gridSize * 7}px;
  font-size: ${props => props.theme.fontSizeMinor}px;
`;

const SocialButtons = styled.div`
  margin-top: ${props => props.theme.gridSize * 3}px;
`;

export const SignInForm = () => {
  const history = useHistory();

  const handleSignInGithub = () => {
    console.log('sign in with github');
    window.location = CONFIG.auth.github;
  };

  React.useEffect(() => {
    // Receive access token
    const accessToken = extractAccessToken();
    console.log(accessToken);
    // Check access token by get current user
    history.push('/');
  }, []);

  return (
    <SignInFormStyled>
      <LoginIconStyled>
        <Image src={icLoginGithub} width={72} />
      </LoginIconStyled>
      <LoginMsgStyled>
        Login to start creating lightning talks now!
      </LoginMsgStyled>
      <OptionsMsgStyled>Choose your login method</OptionsMsgStyled>
      <SocialButtons>
        <SocialSignInButton
          label="Sign In With Github"
          iconSrc={icSocialLoginBtnIcon}
          backgroundColor="#333333"
          light
          onClick={handleSignInGithub}
        />
      </SocialButtons>
    </SignInFormStyled>
  );
};

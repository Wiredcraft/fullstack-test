import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { InputField } from '../../../components/input-field';
import { TextAreaField } from '../../../components/textarea-field';
import { Button } from '../../../components/button';
import IcBtnCancel from '../../../assets/ic-btn-cancel.svg';
import IcBtnAdd from '../../../assets/ic-btn-add.svg';

const FormStyled = styled.form`
  padding: ${props => props.theme.gridSize}px
    ${props => props.theme.gridSize * 2}px;
`;

const ButtonStyled = styled(Button)`
  margin-left: ${props => props.theme.gridSize * 2}px;
  padding: 0 ${props => props.theme.gridSize * 2}px 0
    ${props => props.theme.gridSize}px;
  height: ${props => props.theme.gridSize * 6}px;
  border-radius: 2px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.gridSize * 6}px;
`;

export const CreateTalkForm = () => {
  const history = useHistory();
  const cancel = () => history.push('/');
  const create = e => {
    e.preventDefault && e.preventDefault();
    console.log('create talk...');
  };

  const formik = useFormik({
    initialValues: {}
  });

  return (
    <FormStyled onSubmit={create}>
      <InputField label="Title" />
      <TextAreaField label="Description" rows={4} />
      <ButtonsGroup>
        <ButtonStyled inverted icon={<IcBtnCancel />} onClick={cancel}>
          Cancel
        </ButtonStyled>
        <ButtonStyled type="submit" primary icon={<IcBtnAdd />}>
          Create
        </ButtonStyled>
      </ButtonsGroup>
    </FormStyled>
  );
};

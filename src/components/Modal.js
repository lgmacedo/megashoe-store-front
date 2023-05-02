import styled from "styled-components";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import Carregamento from "./Carregamento.js";
import { useEffect, useState } from "react";

export default function Modal({
  children,
  height = "150px",
  width = "min(calc(100% - 64px), 400px)",
  mostrar = false,
}) {
  return (
    <StyledModalContainer mostrar={mostrar}>
      <StyledModalConteudo mostrar={mostrar} width={width} height={height}>
        {children}
      </StyledModalConteudo>
    </StyledModalContainer>
  );
}

export function CarregamentoModal({
  children,
  height = "150px",
  width = "min(calc(100% - 64px), 400px)",
  mostrar = false,
}) {
  return (
    <Modal height={height} width={width} mostrar={mostrar}>
      <Carregamento />
      {children}
    </Modal>
  );
}

export function SucessoModal({ children, mostrar = false }) {
  const [show, setShow] = useState(mostrar);

  useEffect(() => {
    setShow(mostrar);
  }, [mostrar]);

  return (
    <StyledModalContainer
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setShow(false);
      }}
      mostrar={show}>
      <StyledModalDefined mostrar={show}>
        <CheckCircle size={32} weight="fill" color="#a3e635" />
        {children}
      </StyledModalDefined>
    </StyledModalContainer>
  );
}

export function ErroModal({ children, mostrar = false }) {
  const [show, setShow] = useState(mostrar);

  useEffect(() => {
    setShow(mostrar);
  }, [mostrar]);

  return (
    <StyledModalContainer
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setShow(false);
      }}
      mostrar={show}>
      <StyledModalDefined mostrar={show}>
        <XCircle size={32} weight="fill" color="#ef4444" />
        {children}
      </StyledModalDefined>
    </StyledModalContainer>
  );
}

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity ease 0.3s;

  pointer-events: none;
  opacity: 0;

  ${({ mostrar }) =>
    mostrar &&
    `
    pointer-events: all;
    opacity: 1;
  `};
`;

const StyledModalConteudo = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #262626;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform ease 0.3s, opacity ease 0.3s;
  transform: scaleY(0);
  opacity: 0;

  ${({ mostrar }) =>
    mostrar &&
    `
    pointer-events: all;
    opacity: 1;
    transform: scaleY(1);
  `}
`;

const StyledModalDefined = styled(StyledModalConteudo)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

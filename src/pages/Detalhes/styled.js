import styled from "styled-components";

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  max-width: 600px;
  margin: 0 auto;
  padding-bottom: calc(75px + 32px);

  img {
    margin-bottom: 41px;
    width: 90%;
    object-fit: cover;
  }

  & > :not(img) {
    margin: 0 32px;
  }

  svg:last-of-type {
    margin-top: 24px;
  }

  p:nth-child(2) {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: #fafafa;
    margin-bottom: 8px;
  }
  p:nth-child(3) {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #a3a3a3;
    margin-bottom: 41px;
  }
  button {
    width: calc(100% - 64px);
    margin-bottom: 41px;
  }
  p:nth-child(5) {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #fafafa;
  }
  p:nth-child(6) {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #a3a3a3;
  }
  svg {
    position: absolute;
    cursor: pointer;
  }
`;

export { ProductDetailsContainer };

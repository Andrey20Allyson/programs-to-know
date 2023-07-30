import React, { JSX, PropsWithChildren, createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const EMPITY_PROPS = Symbol();
type EmpityProps = typeof EMPITY_PROPS;

type ModalLike<P> = (props: P) => JSX.Element;
type ModalProps<M> = M extends ModalLike<infer P> ? P : never;
type ModalContext<P> = {
  props: P | EmpityProps;
  isClosing: boolean;
  isOpen: boolean;

  setProps: (props: P | EmpityProps) => void;
  setClosing: (closing: boolean) => void;
  setOpen: (open: boolean) => void;
  Modal: ModalLike<P>;
}

export function createModalContext<P extends object>(modal: ModalLike<P>) {
  const Context = createContext<ModalContext<P> | null>(null);

  function Provider(props: PropsWithChildren) {
    const [_props, setProps] = useState<P | EmpityProps>(EMPITY_PROPS);
    const [isOpen, setOpen] = useState(false);
    const [isClosing, setClosing] = useState(false);

    return (
      <Context.Provider value={{ isClosing, setClosing, Modal: modal, props: _props, isOpen, setProps, setOpen }}>
        {props.children}
      </Context.Provider>
    );
  }

  function useModalContext() {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('useModal must be used within a ModalProvider');

    return ctx;
  }

  function Modal() {
    const {
      isClosing,
      isOpen,
      props,
      setClosing,
      setOpen,
      Modal,
    } = useModalContext();
    if (!isOpen || props === EMPITY_PROPS) return null;

    function handleAnimationEnd(ev: React.AnimationEvent) {
      if (ev.animationName === 'modal-close') {
        setClosing(false);
        setOpen(false);
      }
    }

    return (
      <StyledModalBody onAnimationEnd={handleAnimationEnd} className={isClosing ? 'closing' : ''}>
        <Modal {...props as JSX.IntrinsicAttributes & P} />
      </StyledModalBody>
    );
  }

  function useModal() {
    return new ModalHandler(useModalContext());
  }

  return { Modal, Provider, useModal };
}

export const StyledModalBody = styled.span`
  background-color: #0005;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  animation: modal-open 200ms;

  &.closing {
    animation: modal-close 200ms;
    opacity: 0;
  }

  @keyframes modal-open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes modal-close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export class ModalHandler<P extends object> {
  constructor(private ctx: ModalContext<P>) { }

  open(props?: P) {
    if (props) this.ctx.setProps(props);

    this.ctx.setOpen(true);
  }

  close() {
    this.ctx.setClosing(true);
  }

  clearProps() {
    this.ctx.setProps(EMPITY_PROPS);
  }
}
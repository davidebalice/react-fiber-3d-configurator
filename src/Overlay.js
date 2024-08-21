import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSnapshot } from 'valtio'
import { ControlsShirt } from './ControlsShirt'
import { ControlsShoes } from './ControlsShoes'
import { ControlsTShirt } from './ControlsTShirt'
import { state } from './store'

export function Overlay() {
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  const prevModel = () => {
    let num = state.model - 1
    if (num < 1) {
      num = 3
    }
    state.model = num
  }

  const nextModel = () => {
    let num = state.model + 1
    if (num > 3) {
      num = 1
    }
    state.model = num
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <img src="/assets/logo.png" alt="Logo" width="120" />
      </motion.header>
      {snap.isMobile && (
        <>
          <div style={{ position: 'absolute', zIndex: '55151' }} onClick={() => prevModel()}>
            arrowSx
          </div>

          <div style={{ position: 'absolute', zIndex: '55151', left: '100px' }} onClick={() => nextModel()}>
            arrowDx
          </div>
        </>
      )}
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="uiText">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h2>3D Configurator - React Fiber</h2>
              </motion.div>
              <div className="uiContent">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}>
                  <p>Click on a 3d Model for customize.</p>
                </motion.div>
              </div>
            </div>

            <div className="uiSection">
              <div className="uiContent">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}></motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            {state.model === 1 ? <ControlsShirt /> : state.model === 2 ? <ControlsTShirt /> : state.model === 3 ? <ControlsShoes /> : ''}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

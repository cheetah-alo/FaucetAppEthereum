## Problemas con la Implementación de la App para Faucet

Estoy enfrentando varios desafíos al desarrollar una aplicación para un faucet en Ethereum. A continuación, detallo los problemas que he encontrado, con la esperanza de obtener alguna orientación o solución:

### 1. Problema al Inicializar el Nodo

Al intentar inicializar el nodo, recibo el siguiente error: `zsh:command not found`. Este error se presenta específicamente cuando intento usar el comando `--mine`. He buscado soluciones en línea, pero no he encontrado nada que se relacione específicamente con este comando.

**Imagen del error:** 

![Screenshot 2023-08-20 at 12 36 55 AM](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/4e38b65e-e971-4325-ac49-1e67ed9e40cc)

Coorboro la cadena y PoW

![Screenshot 2023-08-20 at 12 34 04 AM](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/6ffd9ea1-ffc5-48e0-9eca-392613f74832)

### 2. Inconsistencia en el Saldo en MetaMask

A pesar de que he agregado la red a MetaMask, no se muestra el saldo. Sin embargo, al ejecutar `npx nodemon` en la terminal, sí puedo ver el saldo de la wallet. ¿Podría esto estar relacionado con el nodo que no se levanta correctamente?

Terminal
![Screenshot 2023-08-20 at 1 09 55 AM](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/fb3b0a79-db6e-4a61-b5e4-2ba2f466325b)

Wallet
![Screenshot 2023-08-20 at 12 32 55 AM](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/d7354b70-efa7-41cf-8536-28e6e2aa284f)




### 3. Problemas con el Saldo en el Frontend

En el frontend, la aplicación detecta y responde cuando me conecto a MetaMask y también refleja los cambios cuando cambio de cuentas. Sin embargo, el saldo siempre se muestra como cero. ¿Es posible que el saldo real sea un decimal (como 0,5 ETH) y por eso no se muestra?

![Screenshot 2023-08-20 at 12 33 49 AM](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/dbe16da4-ec53-4eeb-a50d-c784c5f7531b)

---

Agradezco de antemano cualquier ayuda o sugerencia que puedan brindarme. ¡Gracias!

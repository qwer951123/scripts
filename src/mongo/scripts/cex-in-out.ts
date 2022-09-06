/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import '@acala-network/types'
import * as config from '../config'
import {
  AcalaPrimitivesCurrencyCurrencyId,
  AcalaPrimitivesTradingPair,
} from '@acala-network/types/interfaces/types-lookup'
import { AccountBalance, AccountTrace, Event } from '../models'
import { FixedPointNumber } from '@acala-network/sdk-core'
import { Wallet } from '@acala-network/sdk/wallet'
import { fetchEntriesToArray } from '@open-web3/util'
import { formatBalance, table } from '../../log'
import mongoose from 'mongoose'

import runner from '../../runner'

runner()
  .requiredNetwork(['acala'])
  .withApiPromise()
  .run(async ({ api }) => {
    await mongoose.connect(config.mongodbUrl)

    const beforeBlock = 1638215
    const afterBlock = 1694500

    const allEvents = await Event.find()

    for (const event of allEvents) {
      if (event.event !== 'Tokens.Transfer') continue

      const { currencyId, from, to, amount, height, extrinsicHash } = event
    }

    await mongoose.disconnect()
  })

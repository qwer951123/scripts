import { writeFileSync } from 'fs'

import '@acala-network/types'
import '@acala-network/types/interfaces/types-lookup'
import { set } from 'lodash'

import runner from '../runner'

const addresses = [
  '23DhqhsKDDpFnH2GreWy7Sk4dqUmGCCVPGk5Lpr84jxzBh5T',
  '24Px9gwiXJrVgCvWbSG2rxQHLGCWyzyvCNJdSykcNzhQqyKR',
  '21MBxgCyHZbgxwZEXJMAwFBr1U8TPvssrQ6w9phWruRMyFpf',
  '22miD3fb4GakiYzcURaFfLs6WXAkUmUTX2b4UEdBkzju1MDR',
  '21uDV86a2APWt5StkXrVUsmj9WpEnxCBmi8XCBcDWWguw4Bu',
  '23d19597TN8yxc5wBgmxsXFZ5sgvwy8Zp9pcmWbRPifj6ndx',
  '25Xwa9DBi7kxTBsarSDvQzWDYe8X2u3yW6ZtZ7nyjwpaAg3t',
  '232KzC62oBQJcxGbsZEF61qFmhDADUGoQzbPx4PHPBzNMy8W',
  '23YQ6jFqEXJbDMFYoLT7p4s37nXMJj9Qq9hjjkHy3btw9a6F',
  '25WAnhrQgifqxPdywQEsczXwW7By4eerzTdcXnJaXjLA4m8z',
  '265EuiEu91bMBbrBZiEGEH9mkUJYafMuNYtaMVRk3XHEAdTG',
  '26SPPh1YLqytf8n4mav5XYCBVyJqCG5K7qBQDsZgmvxZQqss',
  '235VD7W6WQgZd6foWuuiVyQ2ow61uT9zAFm6UCrXLKzQ3VPU',
  '26YvA4eQkGf6NtTYDQ53VhpGgPq1wY2yp9iXP3PY8yTeY4nC',
  '22T81YVAstzeL1zx5AZD37dU97ejm5o3fvNcNuU2sNhG5qps',
  '24MUpK1uVBgn8kKVh6dBZjJYXa8RYmNyrh8pEzKjKQdCJXRt',
  '263AqwbsRZmBjHWk7G6FxUrmgr7QxxPWDea5GPPS2aj9CTW7',
  '25XJ7PNthzBkFNb5BhKWxinG9bTK3pcy4AnmL5q8Bd2s2v7c',
  '21BZxNXVHK7JymKGnPPW9wNmQNJYTXhM2CftUsoGPpbfXtks',
  '26MJJCHK6NrnRfxNDXyQfiK6ksUCV7VsHf7jhnmhBp2kv3g5',
  '25XneaSHxu7BAD9fELjBoSR8hmFKUNga4BEL5T5pD3uUo71j',
  '234QeQaiAvNHE9brWo7GL53fYk9yGYs9w8EGqNckaitpeYmw',
  '24at2teh82wYYrYfRy24wbLXzsx6PsbwknRARtJWhfP7D8nG',
  '25TTWHNNFKkK2FNYprV7aeg7T7jyZPRjrW6P6eoLzoFhdDCo',
  '24iqn1Y3EP5qEYNsn3xa5RViDkuqZ96vRUcdyXzCPsvhAiWS',
  '24PzbynuB69QNefP1iisbEjK71jo2uwcRWCVAxeb6XZHxBqF',
  '22AvzuUNAtaunFDthQyS3GSwVeGxqnhf6Kh2G42Kfce9vKJp',
  'zup4jAepDp2W6qG7NbRsoPa8hXdqiS27sqR2rwWZQ6t5PBi',
  '22gr7trdLZR17xZxQe9ax94oGdXQLnjTwuiLvUf8RXtUi8yh',
  '26a6B6w6gVB2EYjHcQt44qrtGKrbTJWaB2QUmKFVXRYWoHqU',
  '217seC4ytA7PLAK3r5tq9rtLmuF6QK3najweZSHvojTZUuxf',
  '23Da2dpGZhiGF45fZFhyZR7ZR9yKZekASjpaRrhdLbY5r6yt',
  '23WGC8YAapwLxz1jpw44NW4VhaQ851KA8d165yahhdWkRJRx',
  '263cUSPicxPXUD1CgHn81KjLpeCFubzm1EqsFu6bpPZKrpDp',
  '25v1BEfEoZSWLr34Jqj5Y4CYGRJEyvtTeuTs8a3rVZGpPjEQ',
  '23En8vsfjc5PwPYGTAwazR39LvtzHQGDX3GnAykECufc5kkK',
  '22JN4pgXfUYavBPtc8DAp6Eh47w2bGxtRhYqNdzbpZkXbVqa',
  '22uZp2mo9gBDSznGx5D7NBS14tJ3zRPztpE4ei2Pi8Ap6w8D',
  '21wnQgeWkjyoCDeBPn41QTeBmSm8ddnd9EsGdgi6YonWsmJv',
  '22NYU4mpwbh5xReRkNTztkc2Xc8Bvwjk1TzYxKEnMefLQ4qP',
  '23xYohWzet7RuHmu2Gq1UMTTdfJ5E7H3EVyhcLnwPHFp3vsq',
  '22zcrNq347jVeZYh6inegwLQfJ4m33cxXf1jTXcv8rj7ZowG',
  '24HzwK2w9tDpDHQ5XQQNii3hFnKewJTWfHaZHqGBALCo1XD7',
  '235kJrfWVrjHjzuHFrGPqk5GZoQjaNryadJZH9S68kAoEQ7L',
  '21kt2qzXjyH6fBeG1VRyB4adFjbwramsVczNHca13eua96pu',
  '25bSEvYqvL7bchtGkvme7ycrHb1hqMvcepsMApmNiR1T9ikf',
  '217NfYDjiTTt8THZHH2u5pL71KDAgaEspQxz7k9w5WH9Q4A2',
]

const blocks = [1638215, 1694300]

runner()
  .requiredNetwork(['acala'])
  .atBlock()
  .withApiPromise()
  .run(async ({ api }) => {
    const result: Record<string, { before: string; after: string }> = {}

    for (const block of blocks) {
      const hash = await api.rpc.chain.getBlockHash(block)
      const apiAt = await api.at(hash)

      for (const address of addresses) {
        const blanace = await apiAt.query.tokens.accounts(address, { Token: 'AUSD' })

        set(result, [address, block === blocks[0] ? 'before' : 'after'], blanace.free.toString())
      }
    }

    writeFileSync(
      'balance-before-after.csv',
      'Address, Before, After\n' +
        Object.entries(result)
          .map(([address, detail]) => {
            return [address, detail.before, detail.after].join(',')
          })
          .join('\n')
    )
  })

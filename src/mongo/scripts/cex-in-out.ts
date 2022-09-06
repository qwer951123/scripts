/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import '@acala-network/types'
import * as config from '../config'
import { Event } from '../models'
import fs from 'fs'
import mongoose from 'mongoose'

import runner from '../../runner'

const collectionAddress = '23DhqhsKDDpFnH2GreWy7Sk4dqUmGCCVPGk5Lpr84jxzBh5T'
const knownChargeAddresses = [
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
const involoved = [
  '23zjkju8pxHtm8b26ntsZHjWUaV3LNRc5YDoYAz6ZfVKHUmn',
  '21S9fju5jSp4FWeT1RNQs6MmvfLUc1PoqRivaPNVku6K64oJ',
  '23bmUgSeKMD8Y9triphPw5YHuiz3QUJNqcbmb3Eg9QMQDMWN',
  '253pFTg22JqHbLeLZupexGMDUuXAJLfEriTYkFqvGWPuwcFi',
  '24JxgR7Qph4h1JE2rarvcjLAuJ5ZCRRU3UDHBF8Swuan8YW1',
  '26JmEcghNmggvT46sojckg34Py9zFRKkCcFy3gr49hrFgT2k',
  '24ruSUsgoPMRZxcdTiBagt45HdJbHGgcAsaU82ozy4PXb3CJ',
  '23YqfEJB8zMWi8egFcYmCwa6cv4xQQVQdonAwqH9b5NPbWeK',
  '23eCXs2tg7xv2btSHtb3m79eiN96KZtQ6GMpWpg6EKDQnKB2',
  'zvELhACn7LNjQ8UtSQj6qdiqWCi5TAVTD7e4pK47tJzpFVB',
  '24zbvu8D2iPdB1bmTMjLKDgmLFphWmrsXfFfdMFmJkw3FB7D',
  '24MdTYGN3BDVNRGowPva9tvewYFSUTJ3gxhpBQhxYGu8TJwS',
  '21qmc3rRScZyH5JyiUntmM5GaRfef3rgQQPFUNY9R6seCeNC',
  '21NfhGCx9suuJAtQeC8eSCggFsfvDcysyNvgWXV5Sag6owAS',
  '25T7sudwmcreZicVx21j3pfdchfQmd6eksa6Y1fP8ABxfP5H',
  '24QGpzBVqBi1Tvhsc3Ma6W3zGx8qLspeQRcP7vxZgu7FC6vD',
  '23M5ttkmR6KcnxentoqchgBdUjzMDSzFoUyf5qMs7FsmRMvV',
  '229knqgomJkyQuStdrsCHVS66isnwbK19KnXzeGWMzkifDKQ',
  '22GuvZzKPjLA5xBy7cBYxZAFTTdv6wLSb8ns7kTmuMdhGThR',
  '25QjiwKNzZwjNcGdv6eVVHamr9hRRdueXBqoLNh7Yjf5Hb7x',
  '25YeoRaNJny2k6qU7G1kegSzn8Bd6LJhQQiNAcoHK1ggsvyi',
  '21L3FqQbvZWHwMdum1HAN9pQystzJ64HPeeksatkqwRo5dTp',
  '22jsQ2hNaPCRancXb8pRgwQobg5uCAGhKGHeDgEgSVNeSfAH',
  '246Nmpa9FnoqYXZw69Jg38q8pTbSv8sCJhpxPvx8bK7qLaVS',
  '25xR1fS3anFk75tCyLfW7DML8oJFQ5ashCQqypRneunYrJ5n',
  'zxtz5bspCzwHFQf99sQyYar3RUuFgRuNbesza4bExWZ8Ffq',
  '24W2q3VtjxQiFkMu7jwcdy2ZGmNP2URv1pZ7XySSU1tAVwPX',
  '21FEMBUcwHfVvXHShJyc2rdhsx5NMWRufNSqXuVJPBznkwdM',
  '21cF27pb6shDzCw7JjpAqV3K8ojtn8QuabTsvZzXNKarPije',
  '22EgByt3BcEk8yZALRXg7r6jczZxZ5gtSaY78Y2HgUcAbyFL',
  '24eMLiGUfuaa2BwBEMf2U1WtWMMf6RWqN5ssmv2wQsELmuLq',
  '26B6Nera44zhPNiN4WJXqm4o7LjmZJ9f6AUNykEUrtR7aMfL',
  '21nL69AcvTZ37U5v8ZAHvwSTHkcBZfDej4qTPG9Svk6DK6WK',
  '24TWg2LCGP1emgrwjdVDosKsbAxN7v5PNYsWMV4cyHFmKkwm',
  '21Wut8iYFDdACt9SfgcXecu3UP9kiXdXDrGAPPoAJFgH9gbD',
  '25p6qmpcoEi784Py89X98s1qSxLXoTQ4uqkvanttpCEz84ha',
  '21yodFcT21redDvibBmRzurhk5XVbdPCAyovgokYFJ5VHg6B',
  '23vadonBVJHVcmvFxKFJk9wMrJovrZX872bUoCpu1HUSppLL',
  '2512Ez162vk2Cvv6mgEooHgpgnA6SKGsLMz7uP9DUbS7kpF6',
  '23LUnEKb9MZ9fVXZyrz4PBXkm7sBE9dz676NWCWPFQenAUN3',
  '21UbUwWWQvfwYxpkC6eaP1UPX91jRVpU2M7x3jPjz2tDUa1X',
  '22UJQauqVaapjBjkYAkAVyFgzsXDE5hQVKoSe9HJ7qiR3g5A',
  '23vQQqYeDQ47ZhtZ9bEaZjAyqKV1zPjaaqHaMhwZ4A7q7ity',
  '22qJwBfxrRZ525H5PU9satwMd3UWw3mq2EcsnvFeUVC7iJoB',
  '25YCYnFqKcUB8xz7AsUtuxVWzvqMrUj5wSmo9tWFekRjy3eJ',
  '23EqmPCnw9JhhVfpTUQRfBfNJybzX92aNNNN5btuj9VUn6PW',
  '25cyzqJm7CWS29Czby4C2H5sXixfhM5CWYZWdyW4FfTedhoL',
  '26Xf4gzChCJSgyALv1VbbuGVbXugE8vMnig21c1G6MJWrgPx',
  '26G1ys1zNLTod2FeXazgqvoyq6UiXizVy33ezJazCKXaoD4q',
  '22NebGmNugcz3DPhRWWDa8isRmNmtyH3LneaUQ2zVXBm8K5W',
  '23zgjLBaYGpNb47L6FDuhtUQs4nXyFY2pLLvrR6dHbQ4Y5CQ',
  '22gffEWPauyCGDbSMvH9WDG99rDdm5PkQuVF5LtUcdST76ap',
  '25dmVuiPEJVLBkzqVGmjyLQhGNTJq3LaQpwJsTg8dS5z2yGL',
  '25G4joj5XeTv9fwRA39saF3An7mkPWSjiJJ9BukTprY6a63M',
  '22gs3KcK1tcEmctqEMwDy6cCw2ifpihjDgxGvPoj41jCQE96',
  '21CkJEryF59g3NnE9WeYKQiUunzpKQSRrZL2q32MXmKKP2ak',
  '25uMzVTvEbdHFNKmKLVxB2yifZznLMWzw7zXeTcLv7ZSZ1XH',
  '24p3CNY3uoA8UeMhvFtEbMmYYv9gy9GfSmUr4AYRGHS83fM8',
  '22KzjBnZrLwC6AvRdoxTKWdjL25RxdQ6pGJuVLm1LpRjfAcF',
  '21WWRWSxwjYTVy5b9r1vt2cmN97SZ5Ao8XbXYRqgFqTBU5sj',
  '21jSSNhFoVHdMv6EFLcPGr1rXiJ5oMHWiFS7g4U9CXVkSJXD',
  '22EY1REPGRS914jqkdtmionLiqdDK9DYeQwRFU59qJKGnUVS',
  '22EUQFbKe2MPDVLPTjBh2f2GcoZ7biswu9LmWkJCX17uKx3e',
  '25s8VKMeGL6R6Q3ntctNJfwJXvQ4LHdzDvVVjBVubMtrW4E3',
  '253rcz1RVQnJKFYx95gef6Tce8x9b63EnCciqbpJ6Wm6wryU',
  '22haETaGd4X6z5kdQgMu6vg5sGEQiDapDAhNxLDZMYrhpsQV',
  '23eeaLFFQDMTwFxbba6c9DUBB8BoAAtzBvarANuUWmNezNus',
  '23H3FmpFSz4ybAMqSF73j3Seu9abYHR4F8wMwtd4Zensp4HT',
  '24ui41ZKFCNaEsKTiqfiBook8bjVw3Sat3aTuzWZYPGUEcC9',
  '22gxrD2HNM1YksdAcPPrs4uJbcAwYZRbFpEzz5EP2caEHLuy',
  '22zrLorFPztbMhMwy956v6SJUj8TKkpjLBvtd3rE1G1KJ9zv',
  '21fmkAYHUdQNLR5JvZjoMuypkZuHBHrFUoQQjFaiZH5twMvk',
  '26GQtPxeB8MULyWrXJ2kuRHwm2gDzBtZH4Lh8tWYUNMsFYh4',
  '25MN5qs6YEbDuGoVBQruffE5jSd6PFoSAciBXmTznHq7LbA1',
  '26DanFPdrZn2QqSubyCMQzyXsqFS3K4gJNe8NX4UXfH23QB4',
  '26M299fvKqpewA4oq6wNDjhKm2NjgCGFhBH2ffvB35pGwY2Z',
  '26GwQNK2bP2L22wmVWn3qtV8QGqwncTQ7UsjKbWVuXQ9KfTU',
  '22LSEGuvLGMELifG1vQkXzA6s3cQZ7Qoqpk366PL9n5oLevf',
  '23TkCwTwrCVugQf8oT4JThhheUBAShETStL9YaifdP1hfe2e',
  'zyBVd7Y5h4UaGjmnCPvkJ76KcJfdJtXkeoJXoy7xWZ4H1Pe',
  '24dXVGe3EWtFrm9L1ocZDkKSpaQNFLNspjVxNXXQyRNPNT3w',
  '22ztx4RszYjEAkavuVEEWsF2q5Qj8QMQM95qG1vhkwCP2cBL',
  '23ZbSHgjCPK64Twv7AyhfALHfAHofYihAzDdsT23tm3JQvdW',
  '25e8CwDBHuvcpjMxqco3JnoDGzFqxJhPe9ECQujjZL5rkKmn',
  '25iKu3Mbc92N4iZEZfWfpB8z3YwVueBAs6Z6JNaZXmqnNZPd',
  '25B8hBeyYiQkjQEz1NAKrAGd4rSXDVaMASSWLFUzqGVfaVVC',
  '25gVEhmuESXdQcVDNfxGcfyckHj7m2DepxCufMccRXSv743B',
  '23N9hFfPJAFr62ZvT2fKZ5rpYdh2N1CWKkXaao2MrHPqSjbY',
  '24wq1ZSPgJs2VrczXtuerfKqa21nLE7ckhcAEqvPiWiSgTzw',
  '231vpmhwQK6qEhp8Ldsdp3NzkpVmb3hKqXjqR1LhuTen9cY2',
  '21X37ubVNPUPxDpkhohpUhEuhazpY2c6g1ZQDQ4x6A1y2XQ5',
  '236JPUhpe17imtnxFdyVGfR7shonY7qUNyQzxNVYhMMxa7Ks',
  '26YWvUo42Spua68dnPS7YEwdHyPWq1zZwodbx9BBdYFVJvfg',
  '26Pepc1K4fz81aDY34qTBTds5VRvFnhMpeE8AMJpMbzc5FTW',
  '248TttML1Q1rNJiuVGTa5cM3rRznUfgb9vJBxDzqrpPQwgV2',
  '21HaA6e5VeoF2oWAJGLHrgaweKftnbognvwmS5SNAc6jBdKP',
  '26V2jmUDVuCzLPVKeroyhNhZLdmh3QVd8XpHKFTraUEDV7yi',
  '25uTdZpidKvd4P4re9JmijwgQgaJmAg6c1Vhd4Nqb1quazxz',
  '25Mcs49XaEow1oo7jtZtcQ6ZtkmC1tHdDNjwPPbfPtkxG8Fr',
  '21Ru3Q9SjcHVqwEoUoa2rhCqrB49cnoz4k8njhJCWx6psgE7',
  '23NL7caDdwpuJP1fmLMremj4zDYVZqhxFzto3x9kzJEgiJxe',
  '24EDzeEPwot7AzWkEbBJpCegwupvb5GcCrhoEorm4JPvC7rs',
  '2494xT1E9keyZBQ4V1PzvvjGuMTKZZN4mZRwR1Ao2jh625JP',
  '231WiBjiV1cVjLEUVJZhwFy98CnBDB4wxyQDUn1oeiGQ3pn4',
  '26UuRnUWhMSoz9bVLRDy5MxS6Jdv6qFHjFeS1Tjm3XvTfYhw',
  '25MrEHxVp5GiXcgoL644nKEcYNyo1Msiqjd9rN5HZ34b96MZ',
  '22Nz8AuStjoCSRqMiBnv7qD6cxzEcbtPmwfTuYAy197Axytt',
  '23Bpv5hpuYU3mxroohjLSdL76DPJTX4KWpqtiS1UzDQGPXoj',
  '212MBCvB4ah9E8zgx73Dy7YRgr43LAcAu669tKsby773TA8c',
  '239i5Z6pn575javLs78tCkEKAc47EGpQVLYzZ45AQidvBELa',
  '22nKEsm5a6xHBr2WMWasNxfb4McJeE5bfsoSyd7qfZ6Li71A',
  '23zjNsZdFdxPPxZif7H74g5r48tnUqJ5jAMbbRwf7F7VTJtX',
  '23RZmg9PZiPbnFwPnFHSPez18EQBUtyUrHnbsHRGiSYq9yCu',
  '24ii2oUi7CNMFJmKsRrzib7ubbpdVyLsVbanNDW6QqQFUmD3',
  '24K9D6rTzz54YahB1tiATyR4xu52WpuGAmp3DF3gH6pEFnRd',
  '23jogkHsnkCQpBH6GVh4gNZ8jdAxcisFe7jsGYc6EhUnjiVY',
  '23hRHMpEG8AAu7kccvSSiT2mM2vDXSvtxq4r9kpmmW3vBntN',
  '21WZCqLiXy1sqjaJ6fpvq8qp2NPfjxEPdR5rVZniHDnSgJNx',
  '26dHp5XpGFLBFGQhFMia26PXyGmjoRcXN3bF4JMzXdR3oHnP',
  '21AHrPEtviHtroMP41FsSiCM8tiGVke4R9kh8gWsBHnMBcbX',
  '21XUP2ksCJ3fnpx21vai5qg34458EHksYwk5gBpsUEP2aqMt',
  '223oKMzRHgFyiUtt7eoehFHBjdgK6Sd7rhBhu67UrQy5L8M1',
  '23MzdkQnRdZ2zLrqEFf9HU4hYw9bCcn486QMsL5CL9ZHiqBv',
  '24CHMBYwQrjPAbEJuLMoGdRKmXuQWMtZ3JyK9fXjao6UdAeL',
  '246CS7mbRGx9AxmNCxk8TXPvdTncW1EBStBX1JpuZcETz8ey',
  '23M5ttkp2zdM8qa6LFak4BySWZDsAVByjepAfr7kt929S1U9',
  '24uQnMUTZudk5jZRkSyZsubrdJsVyVipgKDakjDTQsVv2NWS',
  '21FA9Qbu8HgiLCrpPYNXKoGk4gpSo4DaJ9r5bSovgrnc7wmC',
  '26QPRJ4HyWdgewVL9D75jHPDvXLuapEQ2sGd9q7msfDF4H1e',
  '21R8B4SKDaB8Pxad9PasZrRDyAoiQ6Dn9cGY3uinHcDUAuAH',
  '22bGG6vyqj2Ejucd4qqw6DwKsfQ45pPxDqcp8nwjhbtzNvV8',
  '24TrqNahWNkdYRa8sTv9SzJYEQLQ3bFj9GsXeDdn1Y1gieb7',
  '21xcNVGQ2qqKvPDyJpxBMKmBo4nbYD4uqc56M1ApMteVYqPZ',
  '25z72BJGKszJKmuJxr8xKEyo4347U4nF41k66Kqj1iExdhkt',
  '21yBThwi2uXwphcChWmeC4zJc9XGAwNbsnhDWiG2jWZU37PH',
  '25Vu5Qj3iBHSaZVKeCqR1B54iTgcsmDQ55SRHYh96osmVnJs',
  '21EydMRbfJMQJnkANQBhCi2A5qdU8zvhk5vvxFxexFAFxuAR',
  '21WWFKDqzpzhi8biB1kvm7JYec8sjVDZv2TMdPWRACs6bdBa',
  '24xPS64R9vAi3B4vF73bFu9Q9PHNYrrwq4uHd9dATmwYcfMi',
  '25BvadtAZ9uSFTDBn9HBTpbjog3udsiMD4sBzGX3gkyY77G9',
  '24QH7vQNjwddrSrNLYowh8MFPaxvqouJUn8MCXK1FH1Uusrz',
  '25uxQooewTHYuT8tUE7RLDXYpv3R6zVWaC3kxcMCYot4wAtM',
  '22TXwWh1ocBiqXfoKLGCByyZVzjjHfjMvvjuU1sGjn7kaJb4',
  '25iKjHR2nwrn8dUavmFCqAcxrja1YasLQhckWCygb9CC1UuW',
  '25b7KcQUAL4UKqTb7sF5FDXuDZcwKdqbYLEG5BT8P32tgm2z',
  '22eEqr4QVAjsYBbd7cwKgpfTEzGdetrXMYUpYaMd1vonNbGN',
  '23EuMWPLdmyUv5M2L32Cni7TZF5DQgKcjyR44YqmiWNYkTFo',
  '22KzJGdanXdrQdVsS9DZgP6bEiWhKiwukZqTDvaLjRgbXMFf',
  '24Te1bdqq2GqzCaMWVyr2Ur1fncVMbWRQxpdQhtw4Sg7Byve',
  '26bGws8YcpH9hL8RUJMKFNqfLY8UJCcgLTHqstLuYkVsbWEj',
  '26dZgzyY9wt5FpewEsDAMREGUq3SSGbYBuNuRxS6SSuCfYEk',
  '22sFp199qYu4CM9Tok3eh8KtvHHGYZpepwxqtvLbKFqG9hTy',
  '25rJZm2ZB32ND4RtobdmCoPsVjoXzamjbm9xkX2k7Qy31pff',
  'zw69mSioDm66y283xz8g4nzR7zNfwB7Yn89oFo1N4BsrR7j',
  '22Krbu5u65qDU2mwTk2VxzF4BHGLTYmAtYTcqQdAcEeEG3Ss',
  '236HjSoyG9T5Eg8Kozpooia2ME8X8Nj3ZmMNWVak4f6y5Xjq',
  '21HeqPyohwtNdiXarP2MUUTfUzrpVqiqtjgQrshjwWRsCMnQ',
  '21pmwLgPfRhiyRkTzhdLhn8hvQwdeEcLcRUYpfRNGg36wxRj',
  '21L82ErDqiroU6SLx8ymeS5zaZxykH8bA5cQnhvWSL46a2GQ',
  '236h1SUqXjZJt694hkdVYVkMEsczzwwUJq4JnUdXPrdk1bUq',
  '25MiTq4MW9K4KXmMNG4wFtoT6UdDJ4j673REsANF4BhBJSiu',
  '23ndraXHkmxm4TvSZu8oUKP6CvXRTibD1DjqdeariRgMezKy',
  '23pEKoiGWnhXnTtVeT3xFeijVyLUBWvKZLNNGRW7Gq66X1PY',
  '212kyuQJrMGsDU71wxqQS5yvWSRwZp1N25hNrKXEfoyLQfx6',
  '22eRREykiVMEz8eJU7gks2Vu2mCnvYe5gVSkRoBLiLqwTdTV',
  '24NKnoyB5AvQuKwizRCdxzRLQVv9qthrWbcQ9J6UojwEXEe9',
  '25QRGkFCuu5V9wJzV8Ax8Chcyzumn7x7qnQ7D8eTWyMio3Jf',
  '25op15Gh4hS2NvYRhxiC2j44q2mfGJUiFyz42XY9qqQT8jCM',
  '25jUdM96hD2wHz9URBaGakr6b3hBg3vXdnpipqyqNoySEpYp',
  '26SNyz3p9mrTUKgMKEbBRY2DHv8rbPEBKEzFUk5BdCweQqth',
  '24Y9vLUXwKL8wWGaJjYiJ8nEhjEPC61TFHT1mYJKHSvoS4uc',
  '22bj5WDWdR9p1GkmaihDKCCz2nfnRV4L4kcpjcuVP6bKnRbj',
  '214vQDbMfmSZNuno34BYLPgfSeNFXcfKsREtix3rqydDaid5',
  'zy7qEF8UnPd2o2pJU8y3um9eER2deM5UQQfv46Hu5HZqVXg',
  '22vfFfhbVhoynjPYHEvg1QRpozx78r6PvNC16aQKDP1fA6rQ',
  '26MVdgMNEwnr8ELVrHUVNdN8TV75viVdNFdJnoLoPYwwpeGe',
  '24HEKb8cXmwHSU6Mar4d8P6SE1qQbQF12yX976pZY6ZNSg3x',
  'zvUGL5qZcyFeNULmTjAAi1HmF7ErqMbnFeLLspSjzZXcon9',
  '21Xa8cVbwdMy3MUDtjzuu6TwQpmfk7tPuw2LfpzTqQrZkfmn',
  '21qy1hqDnXPoJSrkkDoNokRLv9DZTVCynkSvAgTaErh31YFw',
  '211jQADK94fjAkAC8r4ebLqXDbuLSSwfGkcrZi19wz6BwD3B',
  '23Tk9oyF1LGHd1Xd8AiESEfDrHa2ekpPVA1d3fzgfAY1BqLx',
  '21ndPM6NMYHm2GBFK5PmFn6SCPyLG6gf1BApgGcnCwejJmCr',
  '25pgMzMWVecRaWQtpyQxGGsSYaK62mChPQDHYVW4hWVCtdjs',
  '23HV5FHHVtNANnXSGLtEFyDVoaLacAWEYQFz3Eyz1dDskmWR',
  '25MfHRRRMufcxJfaewW2BopQxQcGP6rchEaT4LycW4f2YV49',
  '22xT3P72kHqspcXMCK5dbHrFFv8twsig9bqT9EHeBFFWtuAW',
  '22HkcpcLThryAjk8k5bfVf3ipgw945XEtMmQYwLaEvccWsTT',
  '24BDktZkdVkT4vPUuxN6neJHBfgTnPFf6pzD5nUuYFkREknC',
  '224Z3vGAykTjMqvAapEGoZ1NJwFbpY8H9C8h5k55ts9oMjqs',
  'zyspU9R2JvFzQVLyYPCaGyxovgsVao9aUzyh6ZwBqFRp4ix',
  '22pkPhqy3rhqjNqyvbZLZVu5xjQjgZnjqaiRcmaATXRPduKq',
  '25n3qh5Y5ytsxrGs9dVCvisY5UhsKcGPdVJDPKtiiKC9uGLL',
  '23ejxDB1a64MctXd2xnW3wCSE4YQdRAGCBD7vJBFBYE9evCR',
  '25jDg2LrAAAuoEUK2mCDBCsNQTirWCpsKEpZMDfkcR8V7n1a',
  '25s8fdiCZzWboZmTZowZr3ce9tbTmiE83WtMN9FZ73N9CYh3',
  '24BPbyAPn5NPMn9cBX6SqpCWMo48vnvoPez4UrspzskGD1Bc',
  '25jS13H1YYenPPfJvMBPnWGT6NdSb9q2nVsnBoeCUmoHhrL5',
  '22xSxpQchqoor2BaDkbCQYDG3Dr57qPeZwFpydc6u3qiojZ3',
  '22Evucy2xZ1kqQPxvSgHox7SEFbz8ozL9ukFiHGQmRjqWf9G',
  '21sxJ4m472ADHk5dyPmwaTMceKK6XiyrK5PGnKBAhsMSzmtb',
  '24dRTLwSUYQ2APGbW5nMWAXinsW5NnxMENPGm7XqngrE8z2e',
  '25xXstF2bnHH6mLpEYseFLn7xKMAQ5mBFgahjG4JQ35kYh1q',
  '23Qw4yodYCybJqohUHn15PbGtqqYhtvE11eoVm2BAgAyXrqY',
  '21RSQnALZMSCEydVN7eV5FGJgWPr7dFygjhqZtWxQ2RASTVy',
  '24VonbUuxQ1CSLG3vPHLbonKvkgEs7dVzkwDQJyMiWvrBkUL',
  '22c1qyYWQS94JSSpYFFcYSs8hYynuwS99pCwUcDayTD1RWtn',
  '24v4GZxiMBXPMhXUaWPfWUA3hr2QUtbDykt8VFsZXdkbaZAe',
  '24zJ17qGXgD4MPxWpk9PB5VXQrT9Uw9ry3KdWYPWfR38V1c4',
  '25mjsSq34RKoDhhuGfQ7xq6fcFyUhCbsZzyGdgxcTGH7Tsmf',
  '21DEGUFAA6LftUymXUc3uiWrfT5c5eMyT2WSjQ55quAMxmzt',
  '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
  '22jgwRxAkkuuei3AzURjHvpoMbZbSocXHCD8RuuwqumyiRQs',
  '25zPhmmQGSEd8fXfH3GVGF5SaN5LYH8ixFt2FAEwQvQyLove',
  '24du1mNezUSi2heYoJzmhMExbD1xAauP3NdMoZN7oVD2P3HX',
  '21qWTdn3YzmjYfBP4B1Bjx7WyYmXgMRZE7ujQjMsRreFVAC7',
  '25unVSX4pB92ZVkGNucBABVMzFKYxzaNVswnWUpeeGbExjWH',
  '23FEpESjW7KPwTi5nfB1Vt4JrJiv54qoVtDxGzhEKwBy2JyF',
  '221rWKSXgNJ2o9Z6mmdUZ1zGGKAgTyCorbSGLW6HpMr5mXtf',
  '21RnvFLxwaxyFHVeVpV5bRbAgvBAo2XoT3tp1L2Z3iBDS2St',
  '22PJWTS5uWWNaY2UCN3yeiegX8QieNbGSZSBU2A6pb2yWPgF',
  '26czmTTj4skVWxok7sDsGcZd3qeGK1EJ8nuysptHB1n873jN',
  '21kXDd8BEUZFL3KXz8nngoJg1iKudPSZWWH9Z3ctYprV4Ga5',
  '24qzxzg1TfciVh819jkXX23QtvmNY66XQHRP3KekzRuwC68t',
  '21R9yWbD6yMZxWjGh3YKLXeZ13NGHfawX4dPetqwUbbatbFB',
  '253FTcNqDA2MJhbfcScvuCYz4XZHkaGrmkkzSsUKELkhsqJK',
  '24NfJ4UEiLKzjTm1wSCfT6FayEnPU1PEDbQ3g6hQ5PKNhsjA',
  '25ipyFy2a2KaGNBnL6T8JjxPZZZc6NJJRZZptcToMjRfGHfh',
  '21yDGcT7wRi9gbTAu77LHxmjUp2Q3gcW69djH271WB4D4RRu',
  '25uQfYHT3mDtqdRuJ9uHNWsi9PaTccZfwMaGG5YPzEeo4dQ5',
  '23hBBPzHJBawcbjXtDupEcKQeg8sdCK9K7nwnRuSVzKL5erY',
  '25KGp5UxqYM8fjYiNAG1ZLG4QgeAvxksDcFDfc4QsCR7HsgR',
  '26Db8gHPgKanUMQ45VKV9mMK6cwKacc7trGZXjhjRM34vMTM',
  '239sqkqn6gL7vtmFReDa9QFfz3WbXxxFbw4UDzFjS9wPErPz',
  '25oT4UNrwyn8HCW2LSQdNJ6EZ831e49146N3EoQzE49PQeDb',
  '21223AMHxPc2a6U7EAxkikmrwi39dZYM4orh4tbCkZ7Xm18K',
  '23KES8jo5njGP4sF9PRFHcsgrwmbaVjhqKCb7rJDgg4PNTyY',
  '21fUu8TdQboLDGt54ccv29zrNyKYwHDfgwuwcPb1SQmWToRH',
  '25YU9wVTBahkEtTr4Hp9ShNGwySCiC7Rc21qfXSWbU8z683A',
  '21qKXbi33JSuLcKbCp43s18aYsBtqVSxf4SAsDyQBp2XSTxW',
  '21CWY64zwnrQR4tfSTkhZSoCELTLT9EtXPLZB6RDgaJMNhwA',
  '22pkvtK91sa2ni3U7tDbMUGwNHHeGUpbv95NMT7yAsKxeaYc',
  '256WYEJkVq2pqWhgNnTGsUJrZcJKioMjz7AF4Q54T4WCEe6W',
  '26Pr17zEadWNeoyuEvLxPrY44WX3UKyBSyzZqKGyHR2VKKW3',
  '23Hkvo53fdHJea3hmArEd65ssbp269WBd7vEnNosAuQrX11o',
  '26AxoBEQeP6XEW4vvM2Uvv283vZZ2pSPdRvmp8oHzJyV1bgu',
  '2691t3qYDaVWziBoAzygPg3hNPcCMoBvnUQGZ7Rs7A4PNjfZ',
  '21CncxiA2PxKn5BXaUiy8MDD9yggFNtX4QN6USei4bA5UFqz',
  '226TKQFzEyR61toyxqB6vUZKphR3gZ1k5fLnM1ZnZZnnbABB',
  '23baEV4iw8kwvDvyrH843mBu81yk1jVfmVWtLnFDvdr2NCAn',
  '25MkmqsvWQsQwxz5iFHVp8BquHVMoePEkMKNDnF6APPDSJUr',
  '26AzeXLPjoRPuK868YxbyUeDsoWy3CPTH5Zn26BF43qATcxW',
  '22RjWS6SQLxy47gZrom4NeKsJzk9proFmPMeCsCARCFg2xBj',
  '266Km1jfZzhGCTUDYrDR3iTe4wPBR3TDgLQNeTfeL1T8HVHd',
  '22AEFKsZfxReBkbU3nT6iYxExjv3pDRKoftXe8p5uX8dxxYb',
  '21FDbFS9cky3EWEyrwrJTeKecdtbADNRp16cUMJEiKm9eXz7',
  '21RyVQrnETovTNZmZt2SkSmZXwFfW69zPcHWUfcs8FkH5RuM',
  '21PEkWwt14Q4UstqavZjKvmUMQg9LSHZ8qY9dNaTs258MoNp',
  '26BNXKPt2Cz2hruJQq9B16kYYSiExrxQhhATormi5wG7JfUQ',
  '253bUYPzZp7frCgPyaFa8KA5fkaZgfN6AwtAXbV4tibjv8Q6',
  '21UJnJQQmwgvRubskSriVinnViUQgp1KR5a9B3u7swd3huHT',
  '234dSvDCT8VoPa1GvLC9Z4K9P7aRgLAE8f95XBx4jYjxDTWs',
  '22nuBZNhdZRAVkg94HicseAJ4wZP1wnpNPxrn8QAp6gr7PBa',
  '22UQSSEHhc7U7uqsTS1UttszLdLWdoepHzGeswMdpmLNPzF8',
  '22YrGh7HFPcDz3dYmsSKMBrpJg4tY3qEuRG3geLcBXVfiiRm',
  '23L411DA95FhXQa12RA853aiF8idBD8kYSkB5o7qWsBj9FDM',
  '231SAz7mrNQZe1j1ppFVAacpZR24Wu7UDPKGcmdHWabwoje8',
  '24pUJWk7jDTgRf8XJ9j3SwkQwdsDXKqnTs63XaJcQXBNauR8',
  '262anW3AQz3zPxW1mNTmM2YRML8owPXKE5FGDHAu1hRhEyzQ',
  '26GgL4EYamjMPegL2YjofcmAfcoFBHVyUfcsNAvPmgxQMufT',
  '24mwM9zniZi15hyST3UdA2XvG5m7RfbCTnLCkrn6nCksd2mx',
  '21XXBvmixsafKw5AdLj3ZeSdjGs1iakkEeMtysDUKJzK1qJW',
  '26T5vfpdkjNcacS1ji6Xam5qWJvTgUwZwGWjPZEYAkXVKVkR',
  '21F4CEVeuggcAPhTRKfjNvSKfqNRQsL7j4s3KpCLzSGPBgWu',
  '22FSoNtT3PMy7vbUpq9bkwD2HCjmVdxNDBk4aQcjU3fh3RCs',
  '2156AuubdNpz2fgRhWePKqWiiQHgx9W71S1iFJX49kci4JRj',
  '2617CiYDsfV5CKzBZz7ogPM1qxraSWwtx9FoTR8qtzyfQw19',
  '234VmxA8nS2pxPTiWKD5LBy85siPE75YNZsBihFFos2mzNEH',
  '21WxAs2mDeVeVcTg9ds5wJrc28T9ETgBrChfWaxyxNSr6oEV',
  '253YMj62b2e49R34bctp2yKQjbPKzqYgUPtjXkfbjhd1g1GV',
]

runner()
  .requiredNetwork(['acala'])
  .withApiPromise()
  .run(async ({ api }) => {
    await mongoose.connect(config.mongodbUrl)

    const beforeBlock = 1638215
    const afterBlock = 1694500

    const allEvents = await Event.find()

    const chargeAddresses = new Set(knownChargeAddresses)
    const collectionTx = []

    for (const event of allEvents) {
      if (event.event !== 'Tokens.Transfer') continue

      const { currencyId, from, to, amount, height, extrinsicHash } = event

      if (currencyId !== '{"Token":"AUSD"}') continue

      if (to === collectionAddress && from) {
        chargeAddresses.add(from)

        collectionTx.push({
          from,
          to,
          amount,
          height,
          extrinsicHash,
        })
      }
    }

    const cexoutTx = []

    for (const event of allEvents) {
      if (event.event !== 'Tokens.Transfer') continue

      const { currencyId, from, to, amount, height, extrinsicHash } = event

      if (currencyId !== '{"Token":"AUSD"}' || !from || !to) continue

      if (chargeAddresses.has(to) && from !== collectionAddress) {
        const isInvolved = involoved.includes(from)

        cexoutTx.push({
          isInvolved,
          from,
          to,
          amount,
          height,
          extrinsicHash,
        })
      }
    }

    fs.writeFileSync(
      'collection-tx.csv',
      'From, To, Amount, Block, Tx Hash\n' +
        collectionTx
          .map((item) => {
            return [item.from, item.to, item.amount, item.height, item.extrinsicHash].join(',')
          })
          .join('\n')
    )

    fs.writeFileSync(
      'cex-out-tx.csv',
      'Is Involved, From, To, Amount, Block, Tx Hash\n' +
        cexoutTx
          .map((item) => {
            return [item.isInvolved || 'false', item.from, item.to, item.amount, item.height, item.extrinsicHash].join(
              ','
            )
          })
          .join('\n')
    )

    await mongoose.disconnect()
  })

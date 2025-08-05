use aiken/crypto.{blake2b_224}
use cardano/assets.{PolicyId}
use cardano/script_context.{ScriptContext}
use cardano/transaction.{Transaction}

validator vending_machine {
  mint(redeemer: Data, _policy_id: PolicyId, _self: Transaction) {
    expect pin: ByteArray = redeemer

    trace @"provided pin": pin

    let pin_hash = blake2b_224(pin)

    trace @"provided pin hash": pin_hash

    pin_hash == #"4f43be03892183d6ea41480f616be43b58937aad2c7511e71be9f80d"
  }

  else(_ctx: ScriptContext) {
    False
  }
}

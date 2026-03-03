import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type Message = {
    name : Text;
    email : Text;
    content : Text;
    owner : Principal;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      switch (Text.compare(message1.name, message2.name)) {
        case (#equal) { Text.compare(message1.email, message2.email) };
        case (order) { order };
      };
    };
  };

  let owner = Map.empty<Principal, [Message]>();

  public shared ({ caller }) func submitMessage(email : Text, name : Text, content : Text) : async () {
    let message : Message = {
      name;
      email;
      content;
      owner = caller;
    };

    let existingMessages = switch (owner.get(caller)) {
      case (null) { [] };
      case (?messages) { messages };
    };

    owner.add(caller, existingMessages.concat([message]));
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    owner.values().flatMap(func(messages) { messages.values() }).toArray().sort();
  };
};

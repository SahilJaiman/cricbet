import smartpy as sp


class CricketBetting(sp.Contract):
    def __init__(self, admin):
        self.init(
            events = sp.big_map(
                tkey = sp.TString, 
                tvalue = sp.TRecord(
                    teamA = sp.TString,
                    teamB = sp.TString,
                    eventStartTime = sp.TTimestamp,
                    fixedBetAmount = sp.TMutez,
                    totalBetAmount = sp.TMutez,
                    resolved = sp.TBool,
                    bettorsCount = sp.TNat,
                    result = sp.TString,
                    #bets = sp.big_map(tkey = sp.TAddress,tvalue = sp.TString),
                )
            ),
            bets = sp.map(tkey= sp.TRecord(eventId = sp.TString, user = sp.TAddress), tvalue = sp.TString),
            admin = admin
        )
    
    @sp.entry_point
    def addEvent(self, params):
        sp.verify(sp.sender == self.data.admin)
        sp.verify(self.data.events.contains(params.eventId)==False, "Event with the same ID already exists")
        sp.verify(params.eventStartTime >= sp.now, "Invalid event start time")
        self.data.events[params.eventId] = sp.record(
            teamA = params.teamA,
            teamB = params.teamB,
            eventStartTime = params.eventStartTime,
            fixedBetAmount = params.fixedBetAmount,
            totalBetAmount = params.totalBetAmount,
            resolved = params.resolved,
            bettorsCount = params.bettorsCount,
            result = params.result,
        )
        
    
    
    @sp.entry_point
    def placeBet(self, params):
        sp.verify(sp.sender != self.data.admin, "Admin cannot bet")
        sp.verify(self.data.events.contains(params.eventId), "Invalid event ID")
        sp.verify(self.data.events[params.eventId].eventStartTime>=sp.now, "Cannot bet after the event has started")
        sp.verify(sp.amount >= self.data.events[params.eventId].fixedBetAmount, "Invalid Amount")
        sp.verify(self.data.bets.contains(sp.record(eventId = params.eventId, user = sp.sender)) == False, "Already Betted")
        
        sp.if (self.data.events[params.eventId].teamA!=params.bet) & (self.data.events[params.eventId].teamB!=params.bet):
            sp.failwith("Invalid Bet")
        
    
        self.data.events[params.eventId].totalBetAmount += self.data.events[params.eventId].fixedBetAmount
        self.data.events[params.eventId].bettorsCount += sp.nat(1)
        self.data.bets[sp.record(eventId = params.eventId, user = sp.sender)] = params.bet

        extra_balance = sp.amount - self.data.events[params.eventId].fixedBetAmount
        sp.if extra_balance > sp.mutez(0):
            sp.send(sp.sender, extra_balance)
    
    @sp.entry_point
    def resolveBet(self, params):
        sp.verify(sp.sender == self.data.admin)
        sp.verify(self.data.events.contains(params.eventId), "Invalid event ID")
        
        winningTeam = params.winningTeam
        losingTeam = params.losingTeam
        self.data.events[params.eventId].result = winningTeam+" "+"Won"
        bettorsCount = self.data.events[params.eventId].bettorsCount
        fixedBetAmount = self.data.events[params.eventId].fixedBetAmount
        winnersList = sp.local('winnersList',[])
        losersList = sp.local('losersList',[])
        extra_amount = sp.local('extra_amount',sp.nat(0))
    
    
        sp.for x in self.data.bets.items():
            sp.if x.key.eventId == params.eventId:
                sp.if x.value == params.winningTeam:
                    winnersList.value.push(x.key.user)
                sp.else:
                    losersList.value.push(x.key.user)

        winnersCount = sp.len(winnersList.value)
        losersCount = sp.as_nat(bettorsCount - winnersCount)
        
        sp.if winnersCount > 0 :
            extra_amount = (losersCount * sp.utils.mutez_to_nat(fixedBetAmount))/winnersCount

        totalWinAmount = sp.utils.nat_to_mutez(extra_amount) + fixedBetAmount

        sp.if winnersCount > 0 :
            sp.for user in winnersList.value:
                sp.send(user,totalWinAmount)
        sp.else:
            sp.for user in losersList.value:
                sp.send(user,fixedBetAmount)

        self.data.events[params.eventId].resolved = True
        
        
        
    @sp.add_test(name = "Cricket Betting")
    def test():
        scenario = sp.test_scenario()
        
        admin  = sp.test_account("admin")
        
        alice  = sp.test_account("alice")
        bob  = sp.test_account("bob")
        mike = sp.test_account("mike")
        charles = sp.test_account("charles")
        john = sp.test_account("john")
        james = sp.test_account("james")
        david = sp.test_account("david")
        travis = sp.test_account("travis")
        

        
        ob = CricketBetting(admin.address)
        
        scenario += ob

        #Test Case - 1
        scenario += ob.addEvent(
             eventId = "Match01",
             teamA = "India",
             teamB = "Pakistan",
             eventStartTime = sp.timestamp_from_utc(2023,3,8,19,29,59),
             fixedBetAmount = sp.tez(2),
             totalBetAmount = sp.tez(0),
             resolved = False,
             bettorsCount = sp.nat(0),
             result = "undeclared",
            
        ).run(sender = admin,now=sp.timestamp_from_utc_now())

        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(amount = sp.tez(3),sender = alice)

        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(amount = sp.tez(5),sender = bob)

        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(amount = sp.tez(4),sender = mike)

        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(amount = sp.tez(6),sender = charles)

        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "Pakistan"
        ).run(amount = sp.tez(2),sender = john)

        scenario += ob.resolveBet(
             eventId = "Match01",
             winningTeam = "India",
             losingTeam = "Pakistan",
        ).run(sender = admin)

        #Test Case - 2 (Attempting to place multiple bets in the same event)
        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(
        amount = sp.tez(5),
        sender = bob,
        valid = False
        )

        #Test Case - 3 (Placing a bet on a non-existent team)
        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "England"
        ).run(
        amount = sp.tez(5),
        sender = david,
        valid = False
        )

        #Test Case - 3 (Trying to bet on a non-existent event)
        scenario += ob.placeBet(
             eventId = "Match50",
             bet = "India"
        ).run(
        amount = sp.tez(5),
        sender = david,
        valid = False
        )
        
        #Test Case - 4 (Trying to bet after event has started)
        scenario += ob.placeBet(
             eventId = "Match01",
             bet = "India"
        ).run(
        amount = sp.tez(3),
        now = sp.timestamp_from_utc(2023,3,10,19,29,59),
        sender = james ,
        valid = False
        )
        
        #Test Case - 5 (Attempting to add an event with an ID that already exists)
        scenario += ob.addEvent(
             eventId = "Match01",
             teamA = "India",
             teamB = "Pakistan",
             eventStartTime = sp.timestamp_from_utc(2023,3,10,19,59,59),
             fixedBetAmount = sp.tez(2),
             totalBetAmount = sp.tez(0),
             resolved = False,
             bettorsCount = sp.nat(0),
             result = "undeclared",    
        ).run(
        sender = admin,
        now=sp.timestamp_from_utc_now(),
        valid = False
        )

        
        #Test Case - 6 (Attempting to add a past event)
        scenario += ob.addEvent(
             eventId = "Match02",
             teamA = "Australia",
             teamB = "England",
             eventStartTime = sp.timestamp_from_utc(2022,1,1,19,59,59),
             fixedBetAmount = sp.tez(2),
             totalBetAmount = sp.tez(0),
             resolved = False,
             bettorsCount = sp.nat(0),
             result = "undeclared",    
        ).run(
        sender = admin,
        now=sp.timestamp_from_utc_now(),
        valid = False
        )
        
        #Test Case - 7 (Admin trying to bet)
        scenario += ob.placeBet(
             eventId = "Match02",
             bet = "England"
        ).run(
        amount = sp.tez(2),
        sender = admin,
        valid = False
        )

        sp.add_compilation_target("My Contract", CricketBetting(sp.address("tz1WT1Lm3giwXCQ3Q1dVANjhrS2Nv1L9SHim")) )
        


        

        

        

        

        
        
       

    



